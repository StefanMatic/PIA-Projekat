import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private _makeCV = "http://localhost:4000/api/makeCV"
  private _findCV = "http://localhost:4000/api/findCV"
  private _updateCV = "http://localhost:4000/api/updateCV"


  constructor(private http: HttpClient) { }

  getCV(usernameUser:String){
    const cvData = {
      username: usernameUser
    }

    return this.http.post<any>(this._findCV, cvData)
  }

  setBaseCV(usernameUser: String) {
    const cvData = {
      username: usernameUser,
      complete: false,
      first: false,
      second: false,
      third: false,
      forth: false
    }

    return this.http.post<any>(this._makeCV, cvData)
  }

  updateCVFirts(information:any){
    const cvData={
      username: information.username,
      first: information.first,

      name: information.name,
      lastname: information.lastname,
      sex: information.sex,
      dateOfBirth: information.dateOfBirth,

      address: information.address,
      country:information.country,
      city: information.city,
      postalCode: information.postalCode,

      number: information.number,
      email: information.email,
      web: information.web
    }

    return this.http.post<any>(this._updateCV, cvData)
  }

  updateCVSecond(information:any){
    const cvData={
      username: information.username,
      second: information.second,
      experience: information.experience
    }

    return this.http.post<any>(this._updateCV, cvData)
  }

  updateCVThird(information:any){
    const cvData={
      username: information.username,
      third: information.third,
      education: information.education
    }

    return this.http.post<any>(this._updateCV, cvData)
  }

  updateCVForth(information:any){
    const cvData={
      username: information.username,
      forth: information.forth,

      languages: information.languages,
      comSkills: information.comSkills,
      organisationSkills: information.organisationSkills,
      jobSkills: information.jobSkills,
      digitalSkills: information.digitalSkills
    }

    return this.http.post<any>(this._updateCV, cvData)
  }
}
