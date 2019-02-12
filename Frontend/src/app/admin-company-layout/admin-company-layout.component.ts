import { Component, OnInit } from '@angular/core';
import { CompanyApplicationService } from '../company-application.service';
import { CompanyApplication } from '../models/companyApplication';
import { Fair } from '../models/fairs';
import { FairLocationElement } from '../models/fairsLocationElement';
import { Package } from '../models/package';
import { PackagesService } from '../packages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-company-layout',
  templateUrl: './admin-company-layout.component.html',
  styleUrls: ['./admin-company-layout.component.css']
})
export class AdminCompanyLayoutComponent implements OnInit {
  allPackages: Package
  role: String
  fair: String

  allCompanyApplications: Array<CompanyApplication> = []
  acceptedCompanies: Array<CompanyApplication> = []
  currentCompanyApp: CompanyApplication

  fairs: Fair;
  locations: Array<FairLocationElement>

  companySelected: String = ''
  locationSelected: String = ''

  showCompany: Boolean = false

  sta1: Boolean = false
  sta2: Boolean = false
  sta3: Boolean = false
  sta4: Boolean = false
  sta5: Boolean = false
  sta6: Boolean = false
  sta7: Boolean = false
  sta8: Boolean = false
  sta9: Boolean = false
  sta10: Boolean = false
  sta11: Boolean = false
  sta12: Boolean = false
  sta13: Boolean = false
  sta14: Boolean = false


  constructor(private companyAppService: CompanyApplicationService,
    private packageService: PackagesService,
    private router: Router) { }

  ngOnInit() {
    this.fair = localStorage.getItem("fair")
    console.log(this.fair)

    this.companyAppService.getAllApplications(this.fair).subscribe(
      (res: Array<CompanyApplication>) => {
        this.allCompanyApplications = res

        for (let comApp of this.allCompanyApplications) {
          if (comApp && comApp.status === '1') {
            this.acceptedCompanies.push(comApp)
          }
        }

        for (let com of this.acceptedCompanies) {
          console.log(com)
          if (com.stand) {
            switch (com.stand) {
              case '1':
                this.sta1 = true;
                break;
              case '2':
                this.sta2 = true;
                break;
              case '3':
                this.sta3 = true;
                break;
              case '4':
                this.sta4 = true;
                break;
              case '5':
                this.sta5 = true;
                break;
              case '6':
                this.sta6 = true;
                break;
              case '7':
                this.sta7 = true;
                break;
              case '8':
                this.sta8 = true;
                break;
              case '9':
                this.sta9 = true;
                break;
              case '10':
                this.sta10 = true;
                break;
              case '11':
                this.sta11 = true;
                break;
              case '12':
                this.sta12 = true;
                break;
              case '13':
                this.sta13 = true;
                break;
              case '14':
                this.sta14 = true;
                break;
            }
          }
        }
        console.log(res)
      },
      err => console.log(err)
    )

    this.packageService.getAllOffers().subscribe(
      (res: Package) => {
        this.allPackages = res
        console.log(this.allPackages)
      },
      err => console.log(err)
    )

    this.companyAppService.getAllFairs().subscribe(
      (res: Fair) => {
        this.fairs = res
        this.locations = this.fairs.Locations
        console.log(this.locations)
        console.log(this.fairs)
      },
      err => console.log(err)
    )
  }

  companySelect() {
    this.showCompany = true

    for (let com of this.acceptedCompanies) {
      if ((com.companyName as string) == this.companySelected) {
        this.currentCompanyApp = com
        break
      }
    }
  }

  locationSelect() {
    this.currentCompanyApp.location = this.locationSelected
  }

  standSelect(index) {
    console.log(index)
    this.currentCompanyApp.stand = index

  }

  onSubmit() {
    this.companyAppService.updateCompanyApplication(this.currentCompanyApp).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
    this.showCompany = false
    this.router.navigate(['/companyLayout'])
  }

}
