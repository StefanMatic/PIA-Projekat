import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Student } from '../models/student';


@Component({
  selector: 'app-cv-personal-skills',
  templateUrl: './cv-personal-skills.component.html',
  styleUrls: ['./cv-personal-skills.component.css']
})
export class CvPersonalSkillsComponent implements OnInit {
  currentUser: Student;
  skills: any = {};

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem("student")))
    this.currentUser = JSON.parse(localStorage.getItem("student"))
  }

  personalSkillsForm = this.fb.group({
    languageInfo: this.fb.group({
      languages: this.fb.array([
        this.createItem()
      ])
    }),
    skillsInfo: this.fb.group({
      comSkills: this.fb.array([
        this.fb.control('')
      ]),
      organisationSkills: this.fb.array([
        this.fb.control('')
      ]),
      jobSkills: this.fb.array([
        this.fb.control('')
      ]),
      digitalSkills: this.fb.array([
        this.fb.control('')
      ])
    })
  })


  createItem(): FormGroup {
    return this.fb.group({
      level: ['', Validators.required],
      lan: ['', Validators.required]
    });
  }

  //getters
  get languages(){
    return this.personalSkillsForm.get('languageInfo.languages') as FormArray
  }
  get comSkills(){
    return this.personalSkillsForm.get('skillsInfo.comSkills') as FormArray
  }
  get organisationSkills(){
    return this.personalSkillsForm.get('skillsInfo.organisationSkills') as FormArray
  }
  get jobSkills(){
    return this.personalSkillsForm.get('skillsInfo.jobSkills') as FormArray
  }
  get digitalSkills(){
    return this.personalSkillsForm.get('skillsInfo.digitalSkills') as FormArray
  }

  //add
  addLanguage(){
    this.languages.push(this.createItem())
  }
  addComSkills(){
    this.comSkills.push(this.fb.control(''))
  }
  addOrganisationSkills(){
    this.organisationSkills.push(this.fb.control(''))
  }
  addJobSkills(){
    this.jobSkills.push(this.fb.control(''))
  }
  addDigitalSkills(){
    this.digitalSkills.push(this.fb.control(''))
  }

  //delete
  deleteLanguage(index){
    this.languages.removeAt(index)
  }
  deleteComSkills(index){
    this.comSkills.removeAt(index)
  }
  deleteOrganisationSkills(index){
    this.organisationSkills.removeAt(index)
  }
  deleteJobSkills(index){
    this.jobSkills.removeAt(index)
  }
  deleteDigitalSkills(index){
    this.digitalSkills.removeAt(index)
  }

  onSubmit() {
    if (this.personalSkillsForm.valid) {
      console.log("nesto")
      this.skills.username = localStorage.getItem("username")
      this.skills.forth = true;

      this.skills.languages = this.personalSkillsForm.value.languageInfo.languages

      this.skills.comSkills = this.personalSkillsForm.value.skillsInfo.comSkills
      this.skills.organisationSkills = this.personalSkillsForm.value.skillsInfo.organisationSkills
      this.skills.jobSkills = this.personalSkillsForm.value.skillsInfo.jobSkills
      this.skills.digitalSkills = this.personalSkillsForm.value.skillsInfo.digitalSkills

      console.log(this.skills)
    }
  }
}
