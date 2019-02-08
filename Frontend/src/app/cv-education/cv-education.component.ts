import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Student } from '../models/student';
import { Education } from '../models/education';
import { CVStatus } from '../models/getCVStatus';
import { GetEducation } from '../models/getEducation';
import { CvService } from '../cv.service';

@Component({
  selector: 'app-cv-education',
  templateUrl: './cv-education.component.html',
  styleUrls: ['./cv-education.component.css']
})
export class CvEducationComponent implements OnInit {
  currentUser: Student;
  myEducation: any = {};

  i: number;
  statusCV: CVStatus;
  patcher: GetEducation;

  role:String;
  username:String;

  constructor(private fb: FormBuilder, private CVservice: CvService) { }

  educationForm = this.fb.group({
    education: this.fb.array([this.createItem()])
  })

  dateCheck: Boolean = true;
  edu: Array<Education> = []


  ngOnInit() {
    this.role = localStorage.getItem("role")
    console.log(this.role)

    if (this.role === "0"){
      console.log("Student")
      this.username = localStorage.getItem("username")
    }
    else{
      console.log("Kompanija")
      this.username = localStorage.getItem("student")
    }

    this.CVservice.getCV(this.username)
    .subscribe(
      (res:any) => {
        this.patcher = res as GetEducation
        this.statusCV = res as CVStatus

        if (this.statusCV.third){

          for (this.i = 0; this.i < this.patcher.education.length - 1; this.i++) {
            this.addEducation()
          }

          this.educationForm.patchValue({
            education: this.patcher.education
          })
        }
      },
      err => console.log(err)
    )}

  get education() {
    return this.educationForm.get('education') as FormArray
  }

  createItem(): FormGroup {
    return this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      title: ['', Validators.required],
      company: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      description: ['']
    });
  }

  addEducation() {
    this.education.push(this.createItem())
  }

  deleteEducation(index) {
    this.education.removeAt(index)
  }

  onSubmit() {
    this.dateCheck = true;
    if (this.educationForm.valid) {
      this.edu = this.educationForm.value.education as Array<Education>
      for (let e of this.edu) {
        console.log(e.from)
        console.log(e.to)

        if (e.from > e.to){
          this.dateCheck = false;
        }
      }
      if (this.dateCheck) {
        console.log("usaoo")
        this.myEducation.username = this.username
        this.myEducation.third = true

        this.myEducation.education = this.educationForm.value.education

        console.log(this.myEducation)
        console.log("saljemo dalje")
        this.CVservice.updateCVThird(this.myEducation).subscribe(
          res => console.log(res),
          err => console.log(err)
        )
      }
    }
  }

}
