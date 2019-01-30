import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  student:any={}

  studentForm = this.fb.group({
    accountInfo: this.fb.group({
      username: [''],
      password: [''],
    }),
    personalInfo: this.fb.group({
      name: [''],
      lastname: [''],
      number: [''],
      email: [''],
      graduated: ['']
    })
  })

  constructor(private fb: FormBuilder, private _auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit(){
    //account info
    this.student.username = this.studentForm.value.accountInfo.username;
    this.student.password = this.studentForm.value.accountInfo.password;

    //personal info
    this.student.name = this.studentForm.value.personalInfo.name;
    this.student.lastname = this.studentForm.value.personalInfo.lastname;
    this.student.number = this.studentForm.value.personalInfo.number;
    this.student.email = this.studentForm.value.personalInfo.email;
    this.student.graduated = this.studentForm.value.personalInfo.graduated;

    if (this.student.graduated === "")
      this.student.graduated = false;
    
    console.warn(this.student);
    this._auth.registerUser(this.student).subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )
  }

}
