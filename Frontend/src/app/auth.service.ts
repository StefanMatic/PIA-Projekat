import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginUri = "http://localhost:4000/api/login"
  private _registerUrl = "http://localhost:4000/api/register"
  private _registerCompanyUrl = "http://localhost:4000/api/registerCompany"

  constructor(private http: HttpClient) { }

  registerCompany(company){
    const companyData = new FormData();
    companyData.append("role", company.role);
    companyData.append("username", company.username);
    companyData.append("password", company.password);
    companyData.append("name", company.name);
    companyData.append("city", company.city);
    companyData.append("address", company.address);
    companyData.append("pib", company.pib);
    companyData.append("numOfEmployees", company.numOfEmployees);
    companyData.append("email", company.email);
    companyData.append("web", company.web);
    companyData.append("activities", JSON.stringify(company.activities));
    companyData.append("speciality", company.speciality);
    companyData.append("image", company.image, company.name);

    return this.http.post<any>(this._registerCompanyUrl, companyData)
  }

  registerUser(user){
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user){
    return this.http.post<any>(this._loginUri, user);
  }
}
