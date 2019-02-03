import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Student } from '../models/student';


@Component({
  selector: 'app-cv-personal-information',
  templateUrl: './cv-personal-information.component.html',
  styleUrls: ['./cv-personal-information.component.css']
})
export class CvPersonalInformationComponent implements OnInit {
  currentUser: Student;
  personal: any = {};

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem("student")))
    this.currentUser = JSON.parse(localStorage.getItem("student"))
  }

  personalInfoForm = this.fb.group({
    personalInfo: this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      sex: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    }),
    locationInfo: this.fb.group({
      address: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required]
    }),
    contactInfo: this.fb.group({
      number: this.fb.array([
        this.createItem()
      ]),
      email: this.fb.array([
        this.fb.control('', Validators.required),
      ]),
      web: this.fb.array([
        this.fb.control('', Validators.required),
      ])
    })
  })

  createItem(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  get number() {
    return this.personalInfoForm.get('contactInfo.number') as FormArray;
  }
  get email() {
    return this.personalInfoForm.get('contactInfo.email') as FormArray;
  }
  get web() {
    return this.personalInfoForm.get('contactInfo.web') as FormArray;
  }

  addNumber() {
    this.number.push(this.createItem())
  }
  addEmail() {
    this.email.push(this.fb.control('', Validators.required))
  }
  addWeb() {
    this.web.push(this.fb.control('', Validators.required))
  }

  deleteNumber(index){
    this.number.removeAt(index)
  }
  deleteEmail(index){
    this.email.removeAt(index)
  }
  deleteWeb(index){
    this.web.removeAt(index)
  }

  onSubmit() {
    if (this.personalInfoForm.valid) {
      console.log("nesto")
      this.personal.username = localStorage.getItem("username")
      this.personal.first = true;

      this.personal.name = this.personalInfoForm.value.personalInfo.name
      this.personal.lastname = this.personalInfoForm.value.personalInfo.lastname
      this.personal.sex = this.personalInfoForm.value.personalInfo.sex
      this.personal.dateOfBirth = this.personalInfoForm.value.personalInfo.dateOfBirth

      this.personal.address = this.personalInfoForm.value.locationInfo.address
      this.personal.country = this.personalInfoForm.value.locationInfo.country
      this.personal.city = this.personalInfoForm.value.locationInfo.city
      this.personal.postalCode = this.personalInfoForm.value.locationInfo.postalCode

      this.personal.number = this.personalInfoForm.value.contactInfo.number
      this.personal.email = this.personalInfoForm.value.contactInfo.email
      this.personal.web = this.personalInfoForm.value.contactInfo.web

      console.log(this.personal)
    }
  }

}
