import { Component, OnInit } from '@angular/core';
import { PackagesService } from '../packages.service';
import { Package } from '../models/package';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packages-view',
  templateUrl: './packages-view.component.html',
  styleUrls: ['./packages-view.component.css']
})
export class PackagesViewComponent implements OnInit {
  allPackages:Package

  constructor(private packageService:PackagesService,
    private router: Router) { }

  ngOnInit() {
    console.log("uziam sve podatke")
    this.packageService.getAllOffers().subscribe(
      (res:Package)=>{
        this.allPackages = res
        console.log(this.allPackages)
      },
      err=>console.log(err)
    )
  }

  editPackage(index){
    localStorage.setItem("index", index)
    this.router.navigate(['/packageDetails']);
  }

  makeNewPackage(){
    localStorage.removeItem("index")
    this.router.navigate(['/packageDetails']);
  }

  editAdditional(){
    this.router.navigate(['/additionalDetails']);
  }

}
