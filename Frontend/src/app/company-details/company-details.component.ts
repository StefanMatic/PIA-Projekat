import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Company } from '../models/compnay';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  company:Company;

  constructor(private findService: StudentService) { }

  ngOnInit() {
    this.findService.getCurrentUser(localStorage.getItem("company"))
    .subscribe(
      (res: Company)=>{
        this.company = res
        console.log(res)
      },
      (err)=>console.log(err)
    )
  }

}
