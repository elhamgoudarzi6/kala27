import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AdminService } from './../../admin.service';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-add-dialog',
  templateUrl: './faq-add-dialog.component.html',
  styleUrls: ['./faq-add-dialog.component.scss'],
  providers: [
    MessageService
  ]
})
export class FaqAddDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    question: [
      {type: 'required', message: 'سوال را وارد کنید.'},
    ],
    reply: [
      {type: 'required', message: 'پاسخ را وارد کنید.'},
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private service: AdminService,
              public ref: DynamicDialogRef,
              public messageService: MessageService,
              public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      question: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      reply: new FormControl(
        null,
        [
          Validators.required
        ]
      )
    });
  }

  submitForm(): void {
    this.service.addFaq(this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

}
