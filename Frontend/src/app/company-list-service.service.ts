import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyListServiceService {
  private _getAllCompaniesUrl="http://localhost:4000/api/allCompanies"
  private _getAllRatings="http://localhost:4000/api/allRatings"
  private _makeRating="http://localhost:4000/api/makeRating"



  constructor(private http: HttpClient) { }

  getAllCompanies(){
    return this.http.get(this._getAllCompaniesUrl)
  }

  getAllRatings(){
    console.log("getAllRatings")
    return this.http.get(this._getAllRatings)
  }

  updateRating(rate){
    console.log("updateRating")
    const ratingData={
      Rating: rate.Rating,
      CompanyName: rate.CompanyName,
      Username: rate.Username
    }

    return this.http.post<any>(this._makeRating, ratingData)
  }
}
