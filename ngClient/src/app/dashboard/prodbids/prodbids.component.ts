import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-prodbids',
  templateUrl: './prodbids.component.html',
  styleUrls: ['./prodbids.component.css']
})
export class ProdbidsComponent implements OnInit {

  @Input() product: object;
  bidVal = '0';

  constructor( private _data: DataService) { }

  ngOnInit() {
  }

  postBid() {
    if (this.product && this.product['_id'] && this.product['_id'] !== -1 ) {
      this._data.postBid(
        this.product['_id'],
        this.bidVal,
        (res) => {
          console.log(res);
          this._data.getProdBids(
            this.product['_id'],
            (prod) => this.product = prod
          );
        }
      );
      this.bidVal = '0';
    } else {
    console.log(`!!!<!!!ERROR!!!!>!!!!:
    OMFG THIS IS THE WORSST OUTCOME POSSIBLE!!!
    UNRECOVERABLE CATASTROPHIC ERROR...
    BEST OPTION NOOW IS TRY THROWING WATER ONTO THE COMPUTER; SMASH OUT
    THE HARDRIVE W/ A HAMMER & PUT YOUR MODEM IN THE FREEZER THEN CALL 911
    BUT IT'S PROBABLY TOO LATE ALREADY IF YOU SEE THIS MESSAGE o: !!`);
    }

  }

}
