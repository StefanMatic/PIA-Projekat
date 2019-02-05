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
  allOffers:Array<Offer> = [];

  constructor(private offerService: CompanyOfferService,
    private router: Router) { }

  ngOnInit() {
    this.offerService.getAllOffers().subscribe(
      (res:Array<Offer>)=>{
        console.log(res)
        this.allOffers = res
      },
      (err)=>console.log(err)
    )
  }

  openDetails(info:String){
    console.log(info)
    localStorage.setItem("offer", info as string)
    this.router.navigate(['/offerDetails'])
  }

}
