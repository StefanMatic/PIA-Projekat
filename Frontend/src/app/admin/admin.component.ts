import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { Fair } from '../models/fairs';
import { FairElement } from '../models/fairsElement';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentUser: Admin
  role: String
  allFairs: Array<Fair>
  myFair: FairElement

  createFair:Boolean = false

  constructor(private studentService: StudentService,
    private router: Router,
    private _auth: AuthService) { }

  ngOnInit() {
    this.role = localStorage.getItem("role")

    this._auth.getAllFairs().subscribe(
      (res: Array<Fair>) => {
        this.allFairs = res

        for (let fair of this.allFairs) {
          for (let f of fair.Fairs) {
            if (Date.parse(f.StartDate as string) > Date.now()) {
              localStorage.setItem("fair", f.Fair as string)
              this.myFair = f
              break
            }
            if ((Date.parse(f.EndDate as string) < Date.now())){
              console.log(f.EndDate)
              console.log(Date.parse(f.EndDate as string))
              console.log(Date.now())
              this.createFair = true
              console.log("aaaaaaa")
            }
          }
        }

        console.log(this.allFairs)
        if (!this.allFairs.length){
          this.createFair = true
        }
          
      },
      err => console.log(err)
    )

    this.studentService.getCurrentUser(localStorage.getItem("username"))
      .subscribe(
        (res: Admin) => {
          console.log(res)
          this.currentUser = res
          console.log("bbbbbb")
          console.log(this.createFair)

        },
        err => {
          console.log(err)
        }
      )
  }

}
