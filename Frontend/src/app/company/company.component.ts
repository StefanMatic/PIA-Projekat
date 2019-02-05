import { Component, OnInit } from '@angular/core';
import { Company } from '../models/compnay';
import { StudentService } from '../student.service';
import { CvService } from '../cv.service';
import { Router } from '@angular/router';
import { Offer } from '../models/offer';
import { CompanyOfferService } from '../company-offer.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  currentUser: Company;
  allCompanyOffers: Array<Offer> = []

  constructor(private studentService: StudentService,
    private CVserver: CvService,
    private offerService: CompanyOfferService,
    private router: Router) { }

  ngOnInit() {
    console.log(localStorage.getItem("username"))
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
        },
        err => {
          console.log(err)
        }
      )
  }

}
