import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Student } from '../models/student';
import { WorkExperience } from '../models/workExperience';

@Component({
  selector: 'app-cv-work-experience',
  templateUrl: './cv-work-experience.component.html',
  styleUrls: ['./cv-work-experience.component.css']
})
export class CvWorkExperienceComponent implements OnInit {
  currentUser: Student;
  work: any = {};

  constructor(private fb: FormBuilder) { }

  workForm = this.fb.group({
    experience: this.fb.array([this.createItem()])
  })

  dateCheck: Boolean = true;
  workEx: Array<WorkExperience> = []

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem("student")))
    this.currentUser = JSON.parse(localStorage.getItem("student"))
  }

  get experience() {
    return this.workForm.get('experience') as FormArray
  }

  createItem(): FormGroup {
    return this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      position: ['', Validators.required],
      company: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      description: ['']
    });
  }

  addExperience() {
    this.experience.push(this.createItem())
  }

  deleteExperience(index) {
    this.experience.removeAt(index)
  }

  onSubmit() {
    this.dateCheck = true;
    if (this.workForm.valid) {
      this.workEx = this.workForm.value.experience as Array<WorkExperience>
      for (let w of this.workEx) {
        console.log(w.from)
        console.log(w.to)

        if (w.from > w.to){
          this.dateCheck = false;
        }
      }
      if (this.dateCheck) {
        console.log("usaoo")
        this.work.username = localStorage.getItem("username")
        this.work.second = true

        this.work.experience = this.workForm.value.experience

        console.log(this.work)
      }
    }
  }

}
