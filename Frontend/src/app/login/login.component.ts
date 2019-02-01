import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { GetUser } from '../models/getUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {}
  imagePath: String = "../image/logo.png"

  badInput: Boolean = false;

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this.badInput = true;
    
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        (res: GetUser) => {
          if (res) {
            if (res.role === "0") {
              this.router.navigate(['/student']);
            }
            else if (res.role === "1") {
              this.router.navigate(['/company'])
            }
          }
          else {
            this.badInput = true;
          }
        },
        err => console.log(err)
      )
  }

}
