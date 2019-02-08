import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private _apply = "http://localhost:4000/api/apply"
  private _updateStatus = "http://localhost:4000/api/updateApplicationStatus"
  private _updateCoverLetter = "http://localhost:4000/api/sendCoverLetter"
  private _updateCoverLetterPDF = "http://localhost:4000/api/sendCoverLetterPDF"
  private _getAllApplications = "http://localhost:4000/api/findAllApplications"
  private _getCoverLetterPDF = "http://localhost:4000/api/getCoverLetterPDF"

  constructor(private http: HttpClient) { }


  makeApplication(app) {
    console.log("Make app")
    const applicationData = {
      idOffer: app.idOffer,
      username: app.username,
      status: app.status
    }

    console.log(app);
    return this.http.post<any>(this._apply, applicationData);
  }

  sendCoverLetter(app) {
    console.log("Cover letter")

    const applicationData = {
      idOffer: app.idOffer,
      username: app.username,
      coverLetter: app.coverLetter
    }

    console.log(app);
    return this.http.post<any>(this._updateCoverLetter, applicationData);
  }

  sendCoverLetterPDF(app) {
    console.log("saljemo pdf")
    console.log(app.coverLetterPDF)
    console.log("provera")

    const applicationData = new FormData();
    applicationData.append("idOffer", app.idOffer)
    applicationData.append("username", app.username)
    applicationData.append("coverLetterPDF", app.coverLetterPDF, app.username)

    return this.http.post<any>(this._updateCoverLetterPDF, applicationData);
  }

  updateStatus(app) {
    console.log("Update status")
    const applicationData = {
      idOffer: app.idOffer,
      username: app.username,
      status: app.status
    }

    console.log(app);
    return this.http.post<any>(this._updateStatus, applicationData);
  }

  getAllApplications(offer: String) {
    console.log("get all apps")
    const applicationData = {
      idOffer: offer
    }

    return this.http.post<any>(this._getAllApplications, applicationData);
  }

  getCoverLetterPDF(pathCoverLetter: String) {
    const applicationData = {
      coverLetterPDF: pathCoverLetter
    }
    return this.http.post(this._getCoverLetterPDF, applicationData,
      {
        responseType: 'blob',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      }
    );

  }

}
