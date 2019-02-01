import { Component, OnInit } from '@angular/core';
import { Company } from '../models/compnay';
import { CompanyListServiceService } from '../company-list-service.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  allCompanies: Array<Company> = []

  constructor(private companyListService: CompanyListServiceService) { }

  ngOnInit() {
    this.companyListService.getAllCompanies()
      .subscribe(
        (res: Array<Company>) => {
          this.allCompanies = res
          console.log(res)
        },
        err => console.log(err)
      )
  }

}
