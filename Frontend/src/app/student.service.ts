import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private _currentUser = "http://localhost:4000/api/currentUser"

  constructor(private http: HttpClient) { }

  getCurrentUser(usernameUser:string){
    const userData = {
      username: usernameUser 
    }
    
    return this.http.post<any>(this._currentUser, userData);
  }
}
