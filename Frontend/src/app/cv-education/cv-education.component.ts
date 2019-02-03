import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Student } from '../models/student';
import { Education } from '../models/education';

@Component({
  selector: 'app-cv-education',
  templateUrl: './cv-education.component.html',
  styleUrls: ['./cv-education.component.css']
})
export class CvEducationComponent implements OnInit {
  currentUser: Student;
  myEducation: any = {};

  constructor(private fb: FormBuilder) { }

  educationForm = this.fb.group({
    education: this.fb.array([this.createItem()])
  })

  dateCheck: Boolean = true;
  edu: Array<Education> = []


  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem("student")))
    this.currentUser = JSON.parse(localStorage.getItem("student"))
  }

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
        this.myEducation.username = localStorage.getItem("username")
        this.myEducation.third = true

        this.myEducation.experience = this.educationForm.value.education

        console.log(this.myEducation)
      }
    }
  }

}
