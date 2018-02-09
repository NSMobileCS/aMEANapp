import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  username = '';
  users: object[] = [
    {
      'likes': [
          '5a7236ed54b2032dd47942e4',
          '5a723e209af10e365028e677'
      ],
      '_id': '5a72368554b2032dd47942e2',
      'name': 'bob',
      'createdAt': '2018-01-31T21:35:01.842Z',
      'updatedAt': '2018-01-31T22:07:28.758Z',
      '__v': 2
    }
  ];


  constructor(
    private _data: DataService,
    private _router: Router
  ) {
    this._data.checkLoggedInUser(
      (user) => {
        this.username = user['name'];
      }
    );


  }

  ngOnInit() {
  }


  userLogout() {
    this._data.logout( () => this._router.navigateByUrl('/') );
  }
}
