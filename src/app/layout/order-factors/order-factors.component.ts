import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../Core/layoutAdmin/admin.service";
import {LayoutService} from "../layout.service";
import {MessageService} from "primeng/api";
import {LocalStorageService} from "../../Auth/localStorageLogin/local-storage.service";
import {CartService} from "../serviceCart/cart.service";

@Component({
  selector: 'app-order-factors',
  templateUrl: './order-factors.component.html',
  styleUrls: ['./order-factors.component.scss'],
  providers: [MessageService]
})
export class OrderFactorsComponent implements OnInit {
  success;
  x: boolean;
  orderId: string;
  orderFactor: string[];
  sum:number=0;
  getCodeSmS:string;
  mobileUser:number;
  orderTrackingCode:string;
  constructor(private route: ActivatedRoute,
              private service:LayoutService,
              private messageService: MessageService,
            ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>
      this.success = params.get('success'));
    this.service.getinfoRefID(this.success).subscribe((res)=>{
      if(res['success']===true){
        let data=res['data'][0];
        localStorage.removeItem('cartList');
        this.orderTrackingCode=data.orderTrackingCode;
        let dataUser=data['User'];
        console.log(data)
        this.mobileUser=dataUser[0].mobile;
        this.x = true;
          //ارسال پیامک برای خریدار
          this.service.getTokenSms().subscribe((res) => {
            if (res['IsSuccessful'] === true) {
              let token = res['TokenKey'];
              let data = {
                ParameterArray: [
                  {Parameter: 'TrackingCode', ParameterValue: this.orderTrackingCode}
                ],
                Mobile:  this.mobileUser,
                TemplateId: '53516'

              };
              this.service.sendSms(data, token).subscribe((res1) => {
                if (res['IsSuccessful'] === true) {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'موفق ',
                    detail: 'کد سفارش شما برای شماره همراه ارسال شد.'
                  });
                }
              });
            }
          });
        //   //ارسال پیامک برای مدیر سایت
          this.service.getTokenSms().subscribe((res) => {
            if (res['IsSuccessful'] === true) {

              let token = res['TokenKey'];
              let data = {
                ParameterArray: [
                  {Parameter: 'TrackingCode', ParameterValue: this.orderTrackingCode}
                ],
                Mobile: '09358146130',
                TemplateId: '53517'

              };
              this.service.sendSms(data, token).subscribe((res1) => {
                if (res1['IsSuccessful'] === true) {

                }
              });
            }
          });

      }
      else{
        this.x = false;
      }
    })

  }

}
