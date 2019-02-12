import { Component, OnInit } from '@angular/core';
import { Fair } from '../models/fairs';
import { Package } from '../models/package';
import { CompanyApplicationService } from '../company-application.service';
import { PackagesService } from '../packages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-fair-create',
  templateUrl: './admin-fair-create.component.html',
  styleUrls: ['./admin-fair-create.component.css']
})
export class AdminFairCreateComponent implements OnInit {
  jsonFile: String = ''
  jsonFilePackage: String = ''
  jsonFileConverted: Fair
  jsonFileConvertedPackage:Package
  helper: any

  badInput: Boolean = false
  badInputPackage: Boolean = false
  showInput: Boolean = false
  showInputPackage: Boolean = false

  step1: Boolean = true;
  step2: Boolean = false;
  step3: Boolean = false;
  step4: Boolean = false;

  constructor(private companyAppService: CompanyApplicationService,
    private packageService: PackagesService,
    private router: Router) { }

  ngOnInit() {
  }

  //Konverzija
  convertJSON() {
    if (this.jsonFile !== '') {
      try {
        this.jsonFileConverted = JSON.parse(this.jsonFile as string)
        console.log(this.jsonFileConverted)
        this.showInput = true
        this.badInput = false
      }
      catch (err) {
        this.badInput = true
      }
    }
    else {
      console.log("nene")
    }
  }

  convertJSONPackage() {
    if (this.jsonFilePackage !== '') {
      try {
        this.jsonFileConvertedPackage = JSON.parse(this.jsonFilePackage as string)
        console.log(this.jsonFileConvertedPackage)
        this.showInputPackage = true
        this.badInputPackage = false
      }
      catch (err) {
        this.badInputPackage = true
      }
    }
    else {
      console.log("nene Paket")
    }
  }


  //Dugmici za rad
  nextStep1() {
    if (this.showInput) {
      this.step1 = false
      this.step2 = true
    } else {
      this.badInput
    }
  }

  nextStep2(){
    this.step3 = true
    this.step2 = false
  }

  previousStep2(){
    this.step1 = true
    this.step2 = false
  }


  previousStep3(){
    this.step3 = false
    this.step2 = true
  }

  onSubmit(){
    this.companyAppService.makeFair(this.jsonFileConverted).subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )
    this.jsonFileConvertedPackage.Fair = this.jsonFileConverted.Fairs[0].Fair
    this.packageService.makePackage(this.jsonFileConvertedPackage).subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )

    this.router.navigate(['/admin'])
  }

}
