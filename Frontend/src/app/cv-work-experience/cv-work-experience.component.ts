import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Student } from '../models/student';

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

  deleteExperience(index){
    this.experience.removeAt(index)
  }

  onSubmit() {
    if (this.workForm.valid) {
      console.log("usaoo")
      this.work.username = this.currentUser.username
      this.work.second = true

      this.work.experience = this.workForm.value.experience 

      console.log(this.work)
    }
  }

}
