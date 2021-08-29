import { LayoutService } from './../../layout.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  providers: [MessageService]
})
export class SubscriptionComponent implements OnInit {
  displayError = false;
  mobileForm: FormGroup;
  emailForm: FormGroup;
  textDialog: string;
  mobileRegix = /^0?9[123]\d{8}$/;
  mobileErrorMessages = {
    mobile: [
      {type: 'required', message: 'شماره موبایل را وارد کنید.'},
      {type: 'minlength', message: 'شماره موبایل باید 11 رقم باشد.'},
      {type: 'maxlength', message: 'شماره موبایل باید 11 رقم باشد.'},
      {type: 'pattern', message: 'لطفا شماره موبایل معتبر وارد کنید.'}
    ]
  };
  emailErrorMessages = {
    email: [
      {type: 'required', message: 'پست الکترونیکی را وارد کنید.'},
      {type: 'maxlength', message: 'پست الکترونیکی نمی تواند از 500 کاراکتر بیشتر باشد.'},
      {type: 'email', message: 'لطفا پست الکترونیکی معتبر وارد کنید.'}
    ]
  };

  constructor(private service: LayoutService,
             private fb: FormBuilder,
             private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.mobileForm = this.fb.group({
      mobile: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern(this.mobileRegix)
        ])
      )
    });
    this.emailForm = this.fb.group({
      email: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.maxLength(500),
        ])
      )
    });
  }


  addEmailSubscription(): void {
    this.service.addEmailSubscription(this.emailForm.value).subscribe((response) => {
      if (response['success'] === true) {
        this.messageService.add({severity: 'success', summary: 'عضویت در خبرنامه ', detail: response['data'], sticky: true});
      } else {
        this.messageService.add({severity: 'error', summary: 'عضویت در خبرنامه ', detail: response['data'], sticky: true});
      }
    });
  }

  addSmsSubscription(): void {
    this.service.addSmsSubscription(this.mobileForm.value).subscribe((response) => {
      console.log(response);
      if (response['success'] === true) {
        this.messageService.add({severity: 'success', summary: 'عضویت در خبرنامه ', detail: response['data'], sticky: true});
      } else {
        this.messageService.add({severity: 'error', summary: 'عضویت در خبرنامه ', detail: response['data'], sticky: true});
      }
    });
  }

  //#end region

}
