import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginUri = "http://localhost:4000/api/login"
  private _registerStudentUrl = "http://localhost:4000/api/registerStudent"
  private _registerCompanyUrl = "http://localhost:4000/api/registerCompany"
  private _getAllFairs = "http://localhost:4000/api/allFairs"


  constructor(private http: HttpClient) { }

  registerCompany(company) {
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

  registerUser(user) {
    const studentData = new FormData();
    studentData.append("role", user.role);
    studentData.append("username", user.username);
    studentData.append("password", user.password);
    studentData.append("name", user.name);
    studentData.append("lastname", user.lastname);
    studentData.append("number", user.number);
    studentData.append("email", user.email);
    studentData.append("image", user.image, user.username);
    studentData.append("graduated", user.graduated);

    console.log(user);
    return this.http.post<any>(this._registerStudentUrl, studentData);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUri, user);
  }

  getAllFairs(){
    console.log("getAllFairs")
    return this.http.get(this._getAllFairs)
  }
}
