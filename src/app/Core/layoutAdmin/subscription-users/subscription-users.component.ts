import { AdminService } from './../admin.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription-users',
  templateUrl: './subscription-users.component.html',
  styleUrls: ['./subscription-users.component.scss'],
  providers: [
    MessageService, ConfirmationService
  ]
})
export class SubscriptionUsersComponent implements OnInit {

  smsList: any[];
  emailList: any[];

  constructor(private messageService: MessageService,
              private service: AdminService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getSmsList();
    this.getEmailList();
  }

  getSmsList(): any{
    this.service.getAllSmsSubscriptions().subscribe((response) => {
      if (response.success === true) {
        this.smsList = response.data;

      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }
  getEmailList(): any{
    this.service.getAllEmailSubscriptions().subscribe((response) => {
      if (response.success === true) {
        this.emailList = response.data;

      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }
  deleteSms(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteSmsSubscription(id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({severity: 'success', summary: ' حذف اطلاعات ', detail: response.data});
            this.getSmsList();
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
  deleteEmail(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteEmailSubscription(id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({severity: 'success', summary: ' حذف اطلاعات ', detail: response.data});
            this.getEmailList();
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
