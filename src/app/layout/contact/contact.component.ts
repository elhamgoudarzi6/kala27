import { LayoutService } from './../layout.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [MessageService],
})
export class ContactComponent implements OnInit {
  contact: FormGroup;
  errorMessages = {
    fullName: [{type: 'required', message: 'نام و نام خانوادگی را وارد کنید.'}],
    email: [{type: 'required', message: 'ایمیل را وارد کنید.'},
      {type: 'email', message: 'ایمیل را به درستی وارد نماید'}],
    title: [
      {type: 'minlength', message: 'طول عنوان باید بیشتر از 5 حرف باشد'},
      {type: 'maxlength', message: 'طول عنوان باید کمتر از 20 حرف باشد'},],
    message: [
      {type: 'minlength', message: 'طول متن باید بیشتر از 20 حرف باشد'},
      {type: 'maxlength', message: 'طول عنوان باید کمتر از 100 حرف باشد'},],

  };

  constructor(private fb: FormBuilder,
              private service: LayoutService,
              public messageService: MessageService,) {
  }

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.contact = this.fb.group({
      fullName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      title: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.service.postContactUs(this.contact.value).subscribe((res) => {
      if (res['success'] === true) {
        this.clearInput()
        this.messageService.add({
          severity: 'success',
          summary: ' موفق ',
          detail: res['data'],
        });
      }
    });
  }
  clearInput(){
    this.contact.controls['fullName'].reset();
    this.contact.controls['email'].reset();
    this.contact.controls['title'].reset();
    this.contact.controls['message'].reset();
  }
}
