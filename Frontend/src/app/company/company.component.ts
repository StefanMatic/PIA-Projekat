import { Component, OnInit } from '@angular/core';
import { Company } from '../models/compnay';
import { StudentService } from '../student.service';
import { CvService } from '../cv.service';
import { Router } from '@angular/router';
import { Offer } from '../models/offer';
import { CompanyOfferService } from '../company-offer.service';
import { CompanyApplicationService } from '../company-application.service';
import { CompanyApplication } from '../models/companyApplication';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  currentUser: Company;
  allCompanyOffers: Array<Offer> = []
  fair: String

  allCompanyApplications: Array<CompanyApplication>

  acceptedFlag: Boolean = false;
  deniedFlag: Boolean = false;
  pendingFlag: Boolean = false;
  haventYetApplied: Boolean = false;
  rejectionMessage: String = ''

  constructor(private studentService: StudentService,
    private offerService: CompanyOfferService,
    private router: Router,
    private companyAppService: CompanyApplicationService) { }

  ngOnInit() {
    this.fair = localStorage.getItem("fair")
    this.companyAppService.getAllApplications(this.fair).subscribe(
      (res: Array<CompanyApplication>) => {
        this.allCompanyApplications = res

        for (let app of this.allCompanyApplications) {
          if (app.companyName === localStorage.getItem("username")) {
            if (app.status === '1') {
              this.acceptedFlag = true
            }
            if (app.status === '2') {
              this.deniedFlag = true
              this.rejectionMessage = app.message
            }
            if (app.status === '0') {
              this.pendingFlag = true
            }
            break
          }
        }

        if (this.acceptedFlag === false && this.deniedFlag === false && this.pendingFlag === false) {
          this.haventYetApplied = true
        }
      },
      err => console.log(err)
    )

    this.studentService.getCurrentUser(localStorage.getItem("username"))
      .subscribe(
        (res: Company) => {
          console.log(res)
          this.currentUser = res
        },
        err => {
          console.log(err)
        }
      )

    this.offerService.getCompanyOffers(localStorage.getItem("username"))
      .subscribe(
        (res: Array<Offer>) => {
          console.log(res)
          this.allCompanyOffers = res
          console.log(res[0]._id)
        },
        err => {
          console.log(err)
        }
      )
  }

  openDetails(info: String) {
    console.log(info)
    localStorage.setItem("offer", info as string)
    this.router.navigate(['/offerDetails'])
  }

  applyToFair() {
    this.router.navigate(['/allPackages'])
  }

}
