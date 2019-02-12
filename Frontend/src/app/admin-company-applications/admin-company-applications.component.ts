import { Component, OnInit } from '@angular/core';
import { CompanyApplicationService } from '../company-application.service';
import { CompanyApplication } from '../models/companyApplication';

@Component({
  selector: 'app-admin-company-applications',
  templateUrl: './admin-company-applications.component.html',
  styleUrls: ['./admin-company-applications.component.css']
})
export class AdminCompanyApplicationsComponent implements OnInit {
  fair: String
  allCompanyApplications: Array<CompanyApplication> = []
  companiesPendingReview: Array<CompanyApplication> = []
  currentCompanyApp: CompanyApplication

  rejectionMessage: String = ''

  notificationError:Boolean = false

  constructor(private companyAppService: CompanyApplicationService) { }

  ngOnInit() {
    this.fair = localStorage.getItem("fair")
    console.log(this.fair)

    this.companyAppService.getAllApplications(this.fair).subscribe(
      (res: Array<CompanyApplication>) => {
        this.allCompanyApplications = res

        for (let comApp of this.allCompanyApplications) {
          if (comApp && comApp.status === '0') {
            this.companiesPendingReview.push(comApp)
          }
        }
        console.log(res)
      },
      err => console.log(err)
    )
  }

  acceptCompanu(index) {
    this.currentCompanyApp = this.companiesPendingReview[index]
    this.currentCompanyApp.status = '1'
    this.companiesPendingReview[index].status = '1'

    this.companyAppService.updateCompanyApplication(this.currentCompanyApp).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  denieCompany(index) {
    this.currentCompanyApp = this.companiesPendingReview[index]

    if (this.currentCompanyApp.message){
      this.currentCompanyApp.status = '2'
      this.companiesPendingReview[index].status = '2'
      this.notificationError = false

      console.log(this.currentCompanyApp)
      
      this.companyAppService.updateCompanyApplication(this.currentCompanyApp).subscribe(
        res => console.log(res),
        err => console.log(err)
      )
      
    }
    else{
      this.notificationError = true
    }
    
  }

}
