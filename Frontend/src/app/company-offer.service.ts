import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyOfferService {
  private _makeOffer = "http://localhost:4000/api/makeOffer"
  private _allOffers = "http://localhost:4000/api/allOffers"
  private _companyOffers = "http://localhost:4000/api/companyOffers"
  private _findOffer = "http://localhost:4000/api/findOffer"


  constructor(private http: HttpClient) { }

  makeOffer(info) {
    console.log("probaaaa")
    const offerData = {
      username: info.username,

      name: info.name,
      description: info.description,
      deadlineDate: info.deadlineDate,
      deadlineTime: info.deadlineTime,
      typeOfJob: info.typeOfJob
    }

    return this.http.post<any>(this._makeOffer, offerData)
  }

  getAllOffers(){
    console.log("all offers")
    return this.http.get(this._allOffers)
  }

  getCompanyOffers(usernameUser: String){
    console.log("getAllCompanyOffers")
    
    const offerData = {
      username: usernameUser
    }

    return this.http.post<any>(this._companyOffers, offerData)
  }

  findOffer(findId:String){
    console.log("find offer")
    console.log(findId)
    const offerData = {
      id: findId
    }
    
    return this.http.post<any>(this._findOffer, offerData)
  }
}
