import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  role:String=''

  constructor(private router: Router){}

  logMeOut(){
    localStorage.clear()
    this.router.navigate(["/login"])
  }

  ngOnInit() {
    this.role = localStorage.getItem('role')

    if (!this.role){
      this.role = '-1'
    }
  }
}
