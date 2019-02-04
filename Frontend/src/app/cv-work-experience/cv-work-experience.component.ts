import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Student } from '../models/student';
import { WorkExperience } from '../models/workExperience';
import { CvService } from '../cv.service';
import { CVStatus } from '../models/getCVStatus';
import { GetWorkExperience } from '../models/getWorkExperience';

@Component({
  selector: 'app-cv-work-experience',
  templateUrl: './cv-work-experience.component.html',
  styleUrls: ['./cv-work-experience.component.css']
})
export class CvWorkExperienceComponent implements OnInit {
  work: any = {};
  i: number;
  statusCV: CVStatus;
  patcher: GetWorkExperience;

  constructor(private fb: FormBuilder, private CVservice: CvService) { }

  workForm = this.fb.group({
    experience: this.fb.array([this.createItem()])
  })

  dateCheck: Boolean = true;
  workEx: Array<WorkExperience> = []

  ngOnInit() {
    this.CVservice.getCV(localStorage.getItem("username"))
    .subscribe(
      (res:any) => {
        this.patcher = res as GetWorkExperience
        this.statusCV = res as CVStatus

        if (this.statusCV.second){

          for (this.i = 0; this.i < this.patcher.experience.length - 1; this.i++) {
            this.addExperience()
          }

          this.workForm.patchValue({
            experience: this.patcher.experience
          })
        }
      },
      err => console.log(err)
    )
    
    
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

        if (w.from > w.to) {
          this.dateCheck = false;
        }
      }
      if (this.dateCheck) {
        console.log("usaoo")
        this.work.username = localStorage.getItem("username")
        this.work.second = true

        this.work.experience = this.workForm.value.experience

        console.log(this.work)
        console.log("saljemo dalje")
        this.CVservice.updateCVSecond(this.work).subscribe(
          res => console.log(res),
          err => console.log(err)
        )
      }
    }
  }

}
