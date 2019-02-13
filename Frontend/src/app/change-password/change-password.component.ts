import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../custom-validators';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  foundUser: Boolean = false;
  couldntFind: Boolean = false;

  findUser: any = {}
  newPassword: any = {}

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  findUserForm = this.fb.group({
    username: ['', Validators.required],
    oldPassword: ['', Validators.required],
  })

  changePasswordForm = this.fb.group({
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
    })


  onSubmitFind() {
    this.findUser.username = this.findUserForm.value.username
    this.findUser.password = this.findUserForm.value.oldPassword

    this.authService.loginUser(this.findUser).subscribe(
      (res) => {
        if (res) {
          this.foundUser = true
          this.couldntFind = false

          console.log(res)
          console.log("nadeno")
        }
        else {
          this.couldntFind = true
          console.log("nije")
        }
      },
      err => console.log(err)
    )
  }

  onSubmit() {
    this.newPassword.username = this.findUser.username
    this.newPassword.password = this.changePasswordForm.value.password

    this.authService.updateUserPassword(this.newPassword).subscribe(
      res => console.log(res),
      err => console.log(err)
    )

    this.router.navigate(['/login'])
  }

}
