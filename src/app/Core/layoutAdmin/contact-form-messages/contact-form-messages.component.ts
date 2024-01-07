import { MessageService, ConfirmationService } from 'primeng/api';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-form-messages',
  templateUrl: './contact-form-messages.component.html',
  styleUrls: ['./contact-form-messages.component.scss'],
  providers: [
    MessageService, ConfirmationService
  ]
})
export class ContactFormMessagesComponent implements OnInit {

  messages: any[];

  constructor(private messageService: MessageService,
              private service: AdminService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): any{
    this.service.getAllContactFormMessages().subscribe((response) => {
      if (response.success === true) {
        this.messages = response.data;

      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  deleteMessage(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteContactFormMessage(id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({severity: 'success', summary: ' حذف اطلاعات ', detail: response.data});
            this.getMessages();
          } else {
            this.messageService.add({severity: 'error', summary: ' حذف اطلاعات ', detail: response.data});
          }
        });
      },
      reject: () => {
        // close
        this.confirmationService.close();
      }
    });
  }

}
