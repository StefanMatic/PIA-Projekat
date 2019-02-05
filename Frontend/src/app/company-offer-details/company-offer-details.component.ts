import { Component, OnInit } from '@angular/core';
import { Offer } from '../models/offer';
import { CompanyOfferService } from '../company-offer.service';
import { Company } from '../models/compnay';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-company-offer-details',
  templateUrl: './company-offer-details.component.html',
  styleUrls: ['./company-offer-details.component.css']
})
export class CompanyOfferDetailsComponent implements OnInit {
  myOffer:Offer;
  offerId:string;

  constructor(private offerService: CompanyOfferService,
    private findService: StudentService) { }

  ngOnInit() {
    this.offerId = localStorage.getItem("offer");
    this.offerService.findOffer(this.offerId)
    .subscribe(
      (res:Offer)=>{
        console.log(res)
        this.myOffer = res
      },
      err=>console.log(err)
    )
  }

}
