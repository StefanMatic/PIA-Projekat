import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyListServiceService {
  private _getAllCompaniesUrl="http://localhost:4000/api/allCompanies"

  constructor(private http: HttpClient) { }

  getAllCompanies(){
    return this.http.get(this._getAllCompaniesUrl)
  }
}
