import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { GetUser } from '../models/getUser';
import { Router } from '@angular/router';
import { Fair } from '../models/fairs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  allFairs: Array<Fair>
  loginUserData = {}
  imagePath: String = "../image/logo.png"

  badInput: Boolean = false;

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit() {
    this._auth.getAllFairs().subscribe(
      (res: Array<Fair>) => {
        this.allFairs = res

        for (let fair of this.allFairs) {
          console.log(fair)
          for (let f of fair.Fairs) {
            console.log(f)
            if (Date.parse(f.StartDate as string) > Date.now()) {
              localStorage.setItem("fair", f.Fair as string)
              break
            }
          }
        }
      },
      err => console.log(err)
    )
  }

  loginUser() {
    this.badInput = true;

    this._auth.loginUser(this.loginUserData)
      .subscribe(
        (res: GetUser) => {
          if (res) {
            localStorage.setItem("role", res.role as string)
            localStorage.setItem("username", res.username as string)
            if (res.role === "0") {
              this.router.navigate(['/student']);
            }
            else if (res.role === "1") {
              this.router.navigate(['/company'])
            }
            else if (res.role === "2") {
              this.router.navigate(['/admin'])
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
