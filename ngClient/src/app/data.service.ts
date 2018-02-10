import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor( private _http: HttpClient ) { }

  initLoginSession (name, callback) {
    this._http.post('/api/login', {name: name}).subscribe(
      (res) => callback(res)
    );
  }

  checkLoggedInUser (callback) {
    this._http.get('/api/login').subscribe(
      (res) => callback(res)
    );
  }

  getUserData (userID, callback) {
    this._http.get(`/api/users/${userID}`).subscribe(
      (res) => callback(res)
    );
  }

  postBid (productID, bidValue, callback) {
    console.log(productID, bidValue, 'callback(fn)');
    this._http.post(`/api/bids/${productID}`, {value: bidValue}).subscribe(
      (res) => callback(res)
    );
  }

  listProds (callback) {
    this._http.get('/api/products').subscribe(
      (res) => callback(res)
    );
  }

  getProdBids (productID, callback) {
    this._http.get(`/api/bids/${productID}`).subscribe(
      (res) => callback(res)
    );
  }

  logout (callback) {
    this._http.get('/api/logout').subscribe(
      (res) => callback(res)
    );
  }

  reset (callback) {
    this._http.get('/api/setprods').subscribe(
      (res) => callback(res)
    );
  }

}
