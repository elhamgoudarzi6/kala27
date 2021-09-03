import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../User.service";

@Component({
  selector: 'app-factor-orders',
  templateUrl: './factor-orders.component.html',
  styleUrls: ['./factor-orders.component.scss']
})
export class FactorOrdersComponent implements OnInit {
  orderId: string;
  orderFactor: string[];
  discount: number = 0;
  sendCost: number = 0;
  sum: number = 0;

  constructor(private route: ActivatedRoute,
              private service: UserService) {
  }

  ngOnInit(): void {
    this.getCost();
    this.route.paramMap.subscribe(
      (params) => (this.orderId = params.get('id'))
    );
    this.service.getOrder(this.orderId).subscribe((response) => {
      if (response['success'] == true) {
        this.orderFactor = response['data'][0];
        let city = this.orderFactor['User'][0].city;
        if (city === 'خرم آباد') {
          this.sendCost = 0;
        } else {
          this.getCost();
        }

        this.discount = Number((this.orderFactor['count'] * this.orderFactor['price']) * this.orderFactor['offerPercent']) / 100;
        this.sum = (Number(this.orderFactor['count'] * this.orderFactor['price']) + Number(this.sendCost)) - this.discount;


      }
    })
  }

  getCost() {
    this.service.getSendCost().subscribe((res) => {
      if (res['success'] === true) {
        let data = res['data'];
        this.sendCost = data[0].cost;
      }
    })
  }

  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

}
