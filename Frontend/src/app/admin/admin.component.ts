import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentUser:Admin
  role:String

  constructor(private studentService: StudentService,
    private router: Router) { }

  ngOnInit() {
    this.role = localStorage.getItem("role")
    console.log(this.role)
    console.log(localStorage.getItem("username"))
    this.studentService.getCurrentUser(localStorage.getItem("username"))
      .subscribe(
        (res:Admin)=>{
          console.log(res)
          this.currentUser = res
        },
        err=>{
          console.log(err)
        }
      )
  }

}
