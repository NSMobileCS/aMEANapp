import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String = '';

  constructor(
    private _data: DataService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.username.length > 1) {
      this._data.initLoginSession(
        this.username,
        (res) => {
          console.log(res);
          this._router.navigateByUrl('/dashboard/ideas');
        }
      );
    }
  }


}
