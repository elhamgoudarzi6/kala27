import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {AdminService} from "../../admin.service";

@Component({
  selector: 'app-factor-orders',
  templateUrl: './factor-orders.component.html',
  styleUrls: ['./factor-orders.component.scss']
})
export class FactorOrdersComponent implements OnInit {
  orderId: string;
  orderFactor: string[];
  sum: number = 0;
  discount: number = 0;

  constructor(private route: ActivatedRoute,
              private service: AdminService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => (this.orderId = params.get('id'))
    );
    this.service.getOrder(this.orderId).subscribe((response) => {
      if (response['success'] == true) {

        this.orderFactor = response['data'][0];
        console.log(this.orderFactor['Product'][0].discountStatus)
        this.discount = Number((this.orderFactor['count'] * this.orderFactor['price']) * this.orderFactor['offerPercent']) / 100;
        this.sum = (Number(this.orderFactor['count'] * this.orderFactor['price']) + Number(this.orderFactor['sendCost'])) - this.discount;
      }
    })
  }

  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    // window.open();
    window.print();
    document.body.innerHTML = originalContents;
    // window.close();
  }
  printPage() {
    window.print();
  }
}
