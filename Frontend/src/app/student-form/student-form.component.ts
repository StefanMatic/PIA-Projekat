import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { mimeType } from '../mime-type.validator';

import { Student } from '../models/student';
import { CustomValidators } from '../custom-validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  //promenljive za rad sa podacima iz forme
  student: any = {}
  studentRole: String = "0"

  studentForm = this.fb.group({
    accountInfo: this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,

        // check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, {
          hasNumber: true
        }),
        // check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, {
          hasCapitalCase: true
        }),
        // check whether the entered password has 3 lower case letters
        CustomValidators.patternValidator(/(?=(.*[a-z]){3})/, {
          hasSmallCase: true
        }),
        // check whether the entered password has a special character
        CustomValidators.patternValidator(
          /[ !?#$.*]/,
          {
            hasSpecialCharacters: true
          }
        ),
        Validators.minLength(8),
        Validators.maxLength(12),
        // check whether the entered password has upper case letter
        CustomValidators.patternValidator(/^[a-zA-Z]/, {
          firstChar: true
        }),

        CustomValidators.patternValidator(/^(?!.*(.)\1)[a-z|A-Z|0-9]/, {
          noTwoSameConsecutive: true
        })
      ])
      ],
      confirmPassword: [null, Validators.compose([Validators.required])]
    },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }),
    personalInfo: this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      number: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.email,
        Validators.required])],
      graduated: [''],
      image: ['', Validators.required, mimeType]
    })
  })

  //promenljive za rad sa slikom
  imagePreview: string | ArrayBuffer;

  constructor(private fb: FormBuilder, private _auth: AuthService, private router: Router) { }

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

  onSubmit() {
    this.student.role = "0";

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
      (res: Student) => {
        console.log(res)
      },
      err => console.log(err)
    )

    this.router.navigate(['/login'])
  }

}
