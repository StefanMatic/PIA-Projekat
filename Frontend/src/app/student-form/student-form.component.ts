import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { mimeType } from '../mime-type.validator';

import { Student } from '../models/student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  //promenljive za rad sa podacima iz forme
  student:any={}
  studentRole:String = "0"

  studentForm = this.fb.group({
    accountInfo: this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    }),
    personalInfo: this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      number: ['', Validators.required],
      email: ['', Validators.required],
      graduated: [''],
      image: ['', Validators.required, mimeType ]
    })
  })

  //promenljive za rad sa slikom
  imagePreview:string | ArrayBuffer;

  constructor(private fb: FormBuilder, private _auth: AuthService) { }

  ngOnInit() {
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.studentForm.patchValue({
      personalInfo: {
        image: file
      }
    });
    this.studentForm.get("personalInfo.image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(){
    this.student.role="0";

    //account info
    this.student.username = this.studentForm.value.accountInfo.username;
    this.student.password = this.studentForm.value.accountInfo.password;

    //personal info
    this.student.name = this.studentForm.value.personalInfo.name;
    this.student.lastname = this.studentForm.value.personalInfo.lastname;
    this.student.number = this.studentForm.value.personalInfo.number;
    this.student.email = this.studentForm.value.personalInfo.email;
    this.student.image = this.studentForm.value.personalInfo.image;
    this.student.graduated = this.studentForm.value.personalInfo.graduated;

    if (this.student.graduated === "")
      this.student.graduated = false;
    
    console.warn(this.student);
    this._auth.registerUser(this.student).subscribe(
      (res:Student)=>{
        console.log(res)
      },
      err=>console.log(err)
    )
  }

}