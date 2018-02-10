import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user = '';
  productList: object[] = [];
  errorMessages: string[] = [];

  constructor(
    private _data: DataService,
    private _router: Router
  ) {
    this._data.checkLoggedInUser(
      (user) => this.user = user
    );
    this._data.listProds(
      (prodList) => this.productList = prodList
    );
   }

  ngOnInit() {
  }

  finalize() {
    this._router.navigateByUrl('/results');
  }

}
