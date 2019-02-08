import { Component, OnInit } from '@angular/core';
import { CvService } from '../cv.service';
import { CVStatus } from '../models/getCVStatus';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cvstudent-form',
  templateUrl: './cvstudent-form.component.html',
  styleUrls: ['./cvstudent-form.component.css']
})
export class CVstudentFormComponent implements OnInit {
  statusCV:CVStatus;
  role:String;
  username:String;

  constructor(private CVserver: CvService,
    private router: Router) { }

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
  }

  finishCV(){
    this.CVserver.getCV(this.username)
    .subscribe(
      (res:CVStatus) => {
        this.statusCV = res;
        if (this.statusCV.first && this.statusCV.second && this.statusCV.third && this.statusCV.forth){
          this.router.navigate(['/student'])
        }
        
      },
      err => console.log(err)
    )
  }

}
