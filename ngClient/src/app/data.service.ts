import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor( private _http: HttpClient ) { }

  initLoginSession (name, callback) {
    this._http.post('/login', {name: name}).subscribe(
      (res) => callback(res)
    );
  }

  checkLoggedInUser (callback) {
    this._http.get('/login').subscribe(
      (res) => callback(res)
    );
  }

  getUserData (userID, callback) {
    this._http.get(`/users/${userID}`).subscribe(
      (res) => callback(res)
    );
  }

  logout (callback) {
    this._http.get('/logout').subscribe(
      (res) => callback(res)
    );
  }

}
