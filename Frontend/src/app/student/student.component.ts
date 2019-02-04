import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../models/student';
import { CvService } from '../cv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  currentUser:Student;
  toMake: Boolean = false;

  constructor(private studentService: StudentService, 
    private CVserver: CvService,
    private router: Router) { }

  ngOnInit() {
    console.log(localStorage.getItem("username"))
    this.studentService.getCurrentUser(localStorage.getItem("username"))
      .subscribe(
        (res:Student)=>{
          console.log(res)
          this.currentUser = res
        },
        err=>{
          console.log(err)
        }
      )
  }

  openCV(){
    this.CVserver.getCV(localStorage.getItem("username"))
    .subscribe(
      (res) => {
        if (res) {
          console.log("vec postoji")

          this.toMake = false
          localStorage.setItem("cv", JSON.stringify(res));
          console.log(JSON.stringify(res))
        }
        else {
          console.log("moramo da pravimo")
          this.toMake = true;
          this.CVserver.setBaseCV(localStorage.getItem("username")).subscribe(
            (res)=>{
              console.log("napravljen novi")
              console.log(res)
              localStorage.setItem("cv", res)
            },
            err=>console.log(err)
          )
        }
      },
      err => console.log(err)
    )

    if (this.toMake){
      this.CVserver.setBaseCV(localStorage.getItem("username")).subscribe(
        (res)=>{
          console.log("napravljen novi")
          console.log(res)
          localStorage.setItem("cv", res)
        },
        err=>console.log(err)
      )
    }

    this.router.navigate(['/makeCV'])
  }
}
