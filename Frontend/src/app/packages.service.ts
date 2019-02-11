import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  private _getPackages = "http://localhost:4000/api/allPackages"
  private _updatePackages = "http://localhost:4000/api/updatePackages"

  constructor(private http: HttpClient) { }

  getAllOffers(){
    console.log("All Offers")
    return this.http.get(this._getPackages)
  }

  updatePackages(pack){
    const packageData={
      _id: pack._id,
      Packages: pack.Packages,
      Additional: pack.Additional
    }

    console.log(packageData);
    return this.http.post<any>(this._updatePackages, packageData);
  }
}
