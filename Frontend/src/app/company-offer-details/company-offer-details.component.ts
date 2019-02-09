import { Component, OnInit } from '@angular/core';
import { Offer } from '../models/offer';
import { CompanyOfferService } from '../company-offer.service';
import { Company } from '../models/compnay';
import { CvService } from '../cv.service';
import { ApplicationService } from '../application.service';

import { saveAs } from 'file-saver';
import { FormBuilder } from '@angular/forms';
import { Application } from '../models/application';
import { Router } from '@angular/router';
import { getLocaleTimeFormat } from '@angular/common';

@Component({
  selector: 'app-company-offer-details',
  templateUrl: './company-offer-details.component.html',
  styleUrls: ['./company-offer-details.component.css']
})
export class CompanyOfferDetailsComponent implements OnInit {
  //promenljive za rad sa izgledom
  currentUserRole: String;
  toMake: Boolean = false;
  applicationReady: Boolean = true;
  applicationIsSent: Boolean = false;
  applyFormShow: Boolean = false;
  alreadyApplied: Boolean = true;
  helpToApply: Boolean = false;
  offerDone: Boolean = false;
  decided:Boolean = false;

  //promenljive za rad sa podacima
  coverLetterText: String = ''

  allCurrentApplications: Array<Application> = []
  myOffer: Offer;
  offerId: string;

  myApplication: any = {}

  constructor(private offerService: CompanyOfferService,
    private router: Router,
    private CVserver: CvService,
    private appService: ApplicationService,
    private fb: FormBuilder) { }

  coverLetForm = this.fb.group({
    coverLetterPDF: [''],
  })

  ngOnInit() {
    this.currentUserRole = localStorage.getItem("role")
    console.log(this.currentUserRole)

    this.offerId = localStorage.getItem("offer");
    this.offerService.findOffer(this.offerId)
      .subscribe(
        (res: Offer) => {
          console.log(res)
          this.myOffer = res
          this.checkFoundDates()
        },
        err => console.log(err)
      )

    if (this.currentUserRole === "1") {
      console.log("kompanija je")
      this.appService.getAllApplications(this.offerId)
        .subscribe(
          (res: Array<Application>) => {
            this.allCurrentApplications = res
            console.log(this.allCurrentApplications)
          }
        )
    }
    else {
      console.log("student je")
      this.appService.getAllApplications(this.offerId)
        .subscribe(
          (res: Array<Application>) => {
            this.allCurrentApplications = res
            console.log(this.allCurrentApplications)

            for (let app of res) {
              if (app.username === localStorage.getItem("username"))
                this.helpToApply = true
            }

            if (!this.helpToApply) {
              this.alreadyApplied = false;
            }

            console.log(this.alreadyApplied)
            console.log(this.helpToApply)

          }
        )
    }
  }

  checkFoundDates() {
    console.log(Date.parse(this.myOffer.deadlineDate.toString() + ' ' + this.myOffer.deadlineTime + ':00'))
    console.log(Date.now())
    if (Date.parse(this.myOffer.deadlineDate.toString() + ' ' + this.myOffer.deadlineTime + ':00') > Date.now()) {
      this.offerDone = false
    }
    else {
      this.offerDone = true
    }

    console.log(this.offerDone)
  }

  fileSelected($event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.coverLetForm.patchValue({
      coverLetterPDF: file
    })
    this.coverLetForm.get('coverLetterPDF').updateValueAndValidity()
    console.log(file)
    console.log(this.coverLetForm)
  }

  showApplyForm() {
    if (this.applyFormShow) {
      this.applyFormShow = false
    }
    else {
      this.applyFormShow = true
      this.CVserver.getCV(localStorage.getItem("username"))
        .subscribe(
          (res) => {
            if (res) {
              console.log("vec postoji")

              this.toMake = false
              localStorage.setItem("cv", JSON.stringify(res));
              console.log(JSON.stringify(res))
            } else {
              this.toMake = true;
            }
          },
          err => console.log(err))
    }
  }

  showCV(studentUserName: String) {
    console.log(studentUserName)
    localStorage.setItem("student", studentUserName as string)

    this.router.navigate(['/makeCV'])
  }

  helper;
  helperWord;
  getCoverLetter(pathToCoverLetter: String) {
    console.log(pathToCoverLetter)
    this.helper = pathToCoverLetter.split('/');
    this.helperWord = this.helper[this.helper.length - 1]
    this.appService.getCoverLetterPDF(this.helperWord).subscribe(
      res => saveAs(res, this.helperWord),
      err => console.log(err)
    )
  }

  acceptSubmit(user: String) {
    this.myApplication.idOffer = this.offerId
    this.myApplication.username = user
    this.myApplication.status = "1"

    this.appService.updateStatus(this.myApplication).subscribe(
      res => console.log(res),
      err => console.log(err)
    )

    this.decided = true
  }

  rejectSubmit(user: String) {
    this.myApplication.idOffer = this.offerId
    this.myApplication.username = user
    this.myApplication.status = "2"

    this.appService.updateStatus(this.myApplication).subscribe(
      res => console.log(res),
      err => console.log(err)
    )

    this.decided = true
  }

  onSubmit() {
    this.myApplication.idOffer = localStorage.getItem("offer")
    this.myApplication.username = localStorage.getItem("username")
    this.myApplication.status = "0"

    if (this.toMake || this.coverLetterText === '' || this.coverLetForm.value.coverLetterPDF !== ''){
      this.applicationReady  = false
      return
    }
    else{
      this.applicationReady = true
    }

    this.appService.makeApplication(this.myApplication).subscribe(
      res => {
        console.log(res)

        if (this.coverLetterText !== '') {
          console.log("saljem dalje")
          this.myApplication.coverLetter = this.coverLetterText
          console.log(this.myApplication)
          this.appService.sendCoverLetter(this.myApplication).subscribe(
            res => console.log(res),
            err => console.log(err)
          )
        }

        if (this.coverLetForm.value.coverLetterPDF !== '') {
          console.log("ucitana vrednost")
          this.myApplication.coverLetterPDF = this.coverLetForm.value.coverLetterPDF
          this.appService.sendCoverLetterPDF(this.myApplication).subscribe(
            res => console.log(res),
            err => console.log(err)
          )
        }
      },
      err => console.log(err)
    )

    console.log(this.coverLetterText)

    this.applicationIsSent = true;
    this.applyFormShow = false;
  }


}
