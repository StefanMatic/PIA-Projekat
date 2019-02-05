import { Component, OnInit } from '@angular/core';
import { Company } from '../models/compnay';
import { CompanyListServiceService } from '../company-list-service.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-student-company-search',
  templateUrl: './student-company-search.component.html',
  styleUrls: ['./student-company-search.component.css']
})
export class StudentCompanySearchComponent implements OnInit {
  allCompanies: Array<Company> = []
  startArrayOfCompanies: Array<Company> = []

  constructor(private companyListService: CompanyListServiceService,
    private router: Router) { }

  ngOnInit() {
    this.companyListService.getAllCompanies()
      .subscribe(
        (res: Array<Company>) => {
          this.allCompanies = res
          this.startArrayOfCompanies = res
          console.log(res)
        },
        err => console.log(err)
      )
  }

  openDetails(info:String){
    console.log(info)
    localStorage.setItem("company", info as string)
    this.router.navigate(['/companyDetails'])

  }

}
