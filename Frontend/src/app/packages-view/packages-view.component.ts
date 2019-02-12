import { Component, OnInit } from '@angular/core';
import { PackagesService } from '../packages.service';
import { Package } from '../models/package';
import { Router } from '@angular/router';
import { CompanyApplication } from '../models/companyApplication';
import { CompanyApplicationService } from '../company-application.service';

@Component({
  selector: 'app-packages-view',
  templateUrl: './packages-view.component.html',
  styleUrls: ['./packages-view.component.css']
})
export class PackagesViewComponent implements OnInit {
  allPackages: Package
  role: String
  fair: String
  currentUser: String

  pick: String = ''
  check: Number = 0

  //promenljive za rad sa frontendom
  chosenPackageIndex: Number
  chosenPackge: String = ''
  chosenAdditional: Array<String> = []


  myApplication: any = {}

  constructor(private packageService: PackagesService,
    private router: Router,
    private companyAppService: CompanyApplicationService) { }

  ngOnInit() {
    this.fair = localStorage.getItem("fair")
    this.role = localStorage.getItem("role")
    this.currentUser = localStorage.getItem("username")
    console.log(this.role)
    console.log("uziam sve podatke")
    this.packageService.getAllOffers().subscribe(
      (res: Package) => {
        this.allPackages = res
        console.log(this.allPackages)
      },
      err => console.log(err)
    )
  }

  editPackage(index) {
    localStorage.setItem("index", index)
    this.router.navigate(['/packageDetails']);
  }

  makeNewPackage() {
    localStorage.removeItem("index")
    this.router.navigate(['/packageDetails']);
  }

  editAdditional() {
    this.router.navigate(['/additionalDetails']);
  }

  addAdditional(index) {
    this.chosenAdditional.push(this.allPackages.Additional[index].Title)
    this.check = (this.check as number) + (this.allPackages.Additional[index].Price as number)
  }

  makeCheck() {
    console.log(this.pick)
    if (this.chosenPackge === '') {
      this.chosenPackageIndex = Number.parseInt(this.pick as string)
      this.chosenPackge = this.allPackages.Packages[Number.parseInt(this.pick as string)].Title
      this.check = (this.check as number) + (this.allPackages.Packages[Number.parseInt(this.pick as string)].Price as number)
    }
    else {
      this.check = (this.check as number) - (this.allPackages.Packages[this.chosenPackageIndex as number].Price as number)

      this.chosenPackageIndex = Number.parseInt(this.pick as string)
      this.chosenPackge = this.allPackages.Packages[Number.parseInt(this.pick as string)].Title
      this.check = (this.check as number) + (this.allPackages.Packages[Number.parseInt(this.pick as string)].Price as number)
    }
  }

  submitApplication() {
    console.log("usaoooooo")
    this.myApplication.fairName = this.fair
    this.myApplication.package = this.chosenPackge
    this.myApplication.additional = this.chosenAdditional
    this.myApplication.companyName = this.currentUser
    this.myApplication.status = '0'
    this.myApplication.price = this.check

    console.log(this.myApplication)

    this.companyAppService.submitCompanyApplication(this.myApplication).subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/company']);
      },
      err => console.log(err)
    )

  }
}
