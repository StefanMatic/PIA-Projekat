import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  private _getPackages = "http://localhost:4000/api/allPackages"
  private _updatePackages = "http://localhost:4000/api/updatePackages"
  private _makePackage = "http://localhost:4000/api/makePackage"


  constructor(private http: HttpClient) { }

  getAllOffers(){
    console.log("All Offers")
    return this.http.get(this._getPackages)
  }

  updatePackages(pack){
    const packageData={
      _id: pack._id,
      Packages: pack.Packages,
      Additional: pack.Additional,
      Fair: pack.Fair
    }

    console.log(packageData);
    return this.http.post<any>(this._updatePackages, packageData);
  }

  makePackage(pack){
    console.log("make package")
    const packageData={
      Packages: pack.Packages,
      Additional: pack.Additional,
      Fair: pack.Fair
    }

    console.log(packageData);
    return this.http.post<any>(this._makePackage, packageData);
  }
}
