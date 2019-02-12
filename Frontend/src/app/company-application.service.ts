import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CompanyApplicationService {
  private _submitCompanyApplication="http://localhost:4000/api/companyApplication"
  private _updateCompanyApplication="http://localhost:4000/api/updateCopmanyApplication"
  private _getAllCompanyApplication="http://localhost:4000/api/allCompanyApplications"

  constructor(private http: HttpClient) { }

  submitCompanyApplication(myApp){
    console.log("submit companu offer")
    console.log(myApp)
    const companyAppData = {
      fairName: myApp.fairName,
      package: myApp.package,
      additional: myApp.additional,
      companyName: myApp.companyName,
      status: myApp.status,
      price: myApp.price
    }
    
    return this.http.post<any>(this._submitCompanyApplication, companyAppData)
  }

  updateCompanyApplication(myApp){
    console.log("update company application")
    console.log(myApp)
    const companyAppData = {
      fairName: myApp.fairName,
      package: myApp.package,
      additional: myApp.additional,
      companyName: myApp.companyName,
      status: myApp.status,
      price: myApp.price
    }
    
    return this.http.post<any>(this._updateCompanyApplication, companyAppData)
  }

  getAllApplications(fair:String){
    console.log("getAllApplications")
    const companyAppData = {
      fairName: fair
    }

    return this.http.post<any>(this._getAllCompanyApplication, companyAppData)
  }
}
