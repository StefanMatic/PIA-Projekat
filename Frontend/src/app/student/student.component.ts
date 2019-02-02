import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  currentUser:Student;

  constructor(private studentService: StudentService) { }

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
}
