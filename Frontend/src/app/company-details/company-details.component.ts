import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Company } from '../models/compnay';
import { Rating } from '../models/ratings';
import { CompanyListServiceService } from '../company-list-service.service';
import { CvService } from '../cv.service';
import { GetWorkExperience } from '../models/getWorkExperience';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  company: Company;
  formRating: Number;
  myRating: any = {};
  role: String;

  companyRating: Number;

  numRatings: number = 0;
  sumRatings: number = 0;
  allRatings: Array<Rating> = []

  patcher:GetWorkExperience
  can:Boolean = false

  constructor(private findService: StudentService,
    private ratingService: CompanyListServiceService,
    private CVservice: CvService) { }

  ngOnInit() {
    this.role = localStorage.getItem("role")
    this.findService.getCurrentUser(localStorage.getItem("company"))
      .subscribe(
        (res: Company) => {
          this.company = res
          console.log(res)

          this.checkRatings()
        },
        (err) => console.log(err)
      )
    if (this.role === '0') {
      this.CVservice.getCV(localStorage.getItem("username"))
        .subscribe(
          (res: any) => {
            this.patcher = res as GetWorkExperience

            for(let ex of this.patcher.experience){
              if (localStorage.getItem("company") == ex.company){
                this.can = true
                console.log("ajdeeeeee-e-e-e-e-e-e-e")
              }
            }
          })
    }
  }

  changedRate() {
    if (this.role === '0' && this.can) {
      this.myRating.CompanyName = this.company.name
      this.myRating.Username = localStorage.getItem("username")
      this.myRating.Rating = this.formRating

      this.ratingService.updateRating(this.myRating).subscribe(
        res => {
          this.checkRatings()
          console.log(res)
        },
        err => console.log(err)
      )
    }
    else {
      this.formRating = this.companyRating
    }
  }

  checkRatings() {
    this.ratingService.getAllRatings().subscribe(
      (res: Array<Rating>) => {
        this.allRatings = res

        for (let rate of this.allRatings) {
          if (rate.CompanyName == this.company.name) {
            this.numRatings = this.numRatings + 1
            this.sumRatings = this.sumRatings + (rate.Rating as number)
            console.log("======================")
          }
        }

        this.formRating = this.sumRatings / this.numRatings
        console.log(this.formRating)
      },
      err => console.log()
    )
  }

}
