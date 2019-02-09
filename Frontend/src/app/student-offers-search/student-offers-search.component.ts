import { Component, OnInit } from '@angular/core';
import { Offer } from '../models/offer';
import { CompanyOfferService } from '../company-offer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-offers-search',
  templateUrl: './student-offers-search.component.html',
  styleUrls: ['./student-offers-search.component.css']
})
export class StudentOffersSearchComponent implements OnInit {
  //promenljive za prilagodavanje Frontend-a
  currentUserRole:String;

  allOffers: Array<Offer> = [];
  startAllOffers: Array<Offer> = [];

  //promenljive za rad sa pretragom
  helperArray: Array<Offer> = [];
  companySearch: String = '';
  offerSearch: String = '';
  isJob: Boolean = false;
  isInternship: Boolean = false;
  helper: Boolean = false;

  constructor(private offerService: CompanyOfferService,
    private router: Router) { }

  ngOnInit() {
    this.offerService.getAllOffers().subscribe(
      (res: Array<Offer>) => {
        console.log(res)
        this.startAllOffers = res
        this.allOffers = res
     //   this.checkOffersDate()
      },
      (err) => console.log(err)
    )
  }

  /*
  checkFoundDates() {
    this.helperArray = this.allOffers;
    this.allOffers = []
    for (let offer of this.helperArray) {
      if (Date.parse(offer.deadlineDate.toString()) > Date.now())
        this.allOffers.push(offer)
    }
  }

  checkOffersDate() {
    console.log(this.allOffers)
    this.allOffers = [];

    for (let offer of this.startAllOffers) {
      if (Date.parse(offer.deadlineDate.toString()) > Date.now())
        this.allOffers.push(offer)
    }
  }
  */

  openDetails(info: String) {
    console.log(info)
    localStorage.setItem("offer", info as string)
    this.router.navigate(['/offerDetails'])
  }

  onReset() {
    this.allOffers = this.startAllOffers;
    //this.checkOffersDate();
    this.offerSearch = '';
    this.companySearch = '';
    this.isInternship = false;
    this.isJob = false;

    this.helper = false;
    this.helperArray = [];
  }

  onSearch() {
    this.allOffers = [];
    this.helper = false;

    for (let offer of this.startAllOffers) {
      if ((this.offerSearch === '' || offer.name.toLowerCase().indexOf(this.offerSearch.toLowerCase()) !== -1) &&
        (this.companySearch === '' || offer.username.toLowerCase().indexOf(this.companySearch.toLowerCase()) !== -1)) {
        console.log("prosao proveru teksta")
      }
      else
        continue;

      if (this.isInternship) {
        for (let item of offer.typeOfJob) {
          if (item.item_text === "Internship") {
            console.log("jeste praksa")
            this.helper = true;
          }
        }
        if (!this.helper)
          continue
      }

      this.helper = false;
      if (this.isJob) {
        for (let item of offer.typeOfJob) {
          if (item.item_text === "Job") {
            console.log("jeste posao")
            this.helper = true;
          }
        }
        if (!this.helper)
          continue
      }

      //Proslo je sve provere i mozemo da ga ubacimo
      this.allOffers.push(offer)
    }
 //   this.checkFoundDates()
  }

}
