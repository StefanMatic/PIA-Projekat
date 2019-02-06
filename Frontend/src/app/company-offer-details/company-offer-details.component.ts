import { Component, OnInit } from '@angular/core';
import { Offer } from '../models/offer';
import { CompanyOfferService } from '../company-offer.service';
import { Company } from '../models/compnay';
import { StudentService } from '../student.service';
import { CvService } from '../cv.service';
import { ApplicationService } from '../application.service';

import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { saveAs } from 'file-saver';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-company-offer-details',
  templateUrl: './company-offer-details.component.html',
  styleUrls: ['./company-offer-details.component.css']
})
export class CompanyOfferDetailsComponent implements OnInit {
  //promenljive za rad sa izgledom
  currentUserRole: String;
  toMake: Boolean = false;

  //promenljive za rad sa podacima
  coverLetterText: String = ''


  myOffer: Offer;
  offerId: string;

  myApplication: any = {}

  applyFormShow: Boolean = false;

  constructor(private offerService: CompanyOfferService,
    private findService: StudentService,
    private CVserver: CvService,
    private appService: ApplicationService,
    private fb: FormBuilder) { }

    coverLetForm = this.fb.group({
      coverLetterPDF: [''],
    })

  ngOnInit() {
    this.currentUserRole = localStorage.getItem("role")
    console.log(this.currentUserRole)
    console.log("jao")

    this.offerId = localStorage.getItem("offer");
    this.offerService.findOffer(this.offerId)
      .subscribe(
        (res: Offer) => {
          console.log(res)
          this.myOffer = res
        },
        err => console.log(err)
      )
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

  onSubmit() {
    this.myApplication.idOffer = localStorage.getItem("offer")
    this.myApplication.username = localStorage.getItem("username")
    this.myApplication.status = "0"

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

  }

 
}
