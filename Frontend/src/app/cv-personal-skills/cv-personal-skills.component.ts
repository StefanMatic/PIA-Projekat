import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Student } from '../models/student';
import { PersonalSkills } from '../models/personalSkills';
import { CVStatus } from '../models/getCVStatus';
import { CvService } from '../cv.service';


@Component({
  selector: 'app-cv-personal-skills',
  templateUrl: './cv-personal-skills.component.html',
  styleUrls: ['./cv-personal-skills.component.css']
})
export class CvPersonalSkillsComponent implements OnInit {
  currentUser: Student;
  skills: any = {};

  i: number;
  statusCV: CVStatus;
  patcher: PersonalSkills;

  role:String;
  username:String;

  constructor(private fb: FormBuilder,  private CVservice: CvService) { }

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
        this.patcher = res as PersonalSkills
        this.statusCV = res as CVStatus

        if (this.statusCV.forth){

          for (this.i = 0; this.i < this.patcher.languages.length - 1; this.i++) {
            this.addLanguage()
          }
          for (this.i = 0; this.i < this.patcher.comSkills.length - 1; this.i++) {
            this.addComSkills()
          }
          for (this.i = 0; this.i < this.patcher.digitalSkills.length - 1; this.i++) {
            this.addDigitalSkills()
          }
          for (this.i = 0; this.i < this.patcher.jobSkills.length - 1; this.i++) {
            this.addJobSkills()
          }
          for (this.i = 0; this.i < this.patcher.organisationSkills.length - 1; this.i++) {
            this.addOrganisationSkills()
          }

          this.personalSkillsForm.patchValue({
            languageInfo:{
              languages: this.patcher.languages
            },
            skillsInfo:{
              comSkills: this.patcher.comSkills,
              organisationSkills: this.patcher.organisationSkills,
              jobSkills: this.patcher.jobSkills,
              digitalSkills: this.patcher.digitalSkills
            }
          })
        }
      },
      err => console.log(err)
    )}

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
      this.skills.username = this.username
      this.skills.forth = true;

      this.skills.languages = this.personalSkillsForm.value.languageInfo.languages

      this.skills.comSkills = this.personalSkillsForm.value.skillsInfo.comSkills
      this.skills.organisationSkills = this.personalSkillsForm.value.skillsInfo.organisationSkills
      this.skills.jobSkills = this.personalSkillsForm.value.skillsInfo.jobSkills
      this.skills.digitalSkills = this.personalSkillsForm.value.skillsInfo.digitalSkills

      console.log(this.skills)
      console.log("saljemo dalje")
      this.CVservice.updateCVForth(this.skills).subscribe(
        res => console.log(res),
        err => console.log(err)
      )
    }
  }
}
