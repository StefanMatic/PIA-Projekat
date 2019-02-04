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

  constructor(private CVserver: CvService,
    private router: Router) { }

  ngOnInit() {
  }

  finishCV(){
    this.CVserver.getCV(localStorage.getItem("username"))
    .subscribe(
      (res:CVStatus) => {
        this.statusCV = res;
        if (this.statusCV.first && this.statusCV.second && this.statusCV.third && this.statusCV.forth){
          console.log("moze dalje")
          this.router.navigate(['/student'])

        }
        else{
          console.log("mora jos")
        }
      },
      err => console.log(err)
    )
  }

}
