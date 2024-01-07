import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {TicketReplyDialogComponent} from "../../layoutAdmin/ticket/ticket-reply-dialog/ticket-reply-dialog.component";
import {AdminService} from "../../layoutAdmin/admin.service";
import {TicketAddComponent} from "./ticket-add/ticket-add.component";
import {UserService} from "../User.service";
import {LocalStorageService} from "../../../Auth/localStorageLogin/local-storage.service";
import {ProductAddDialogComponent} from "../../layoutAdmin/products/product-add-dialog/product-add-dialog.component";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  providers: [
    MessageService, ConfirmationService, DialogService
  ]
})
export class TicketComponent implements OnInit {
  tickets: any[];
  UserID:string;
  constructor(private messageService: MessageService,
              private service: UserService,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService,
              private localstotage:LocalStorageService) { }

  ngOnInit(): void {
    this.localstotage.getCurrentUser();
    this.UserID=this.localstotage.userJson['id'] || this.localstotage.userJson['_id']
    this.allTicketForUser();
  }
  allTicketForUser(): any{
    this.service.allTicketForUser(this.UserID).subscribe((response) => {
      if (response.success === true) {
        this.tickets = response.data;

      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  showAddProductDialog(): void {
    const ref = this.dialogService.open(TicketAddComponent, {
      data:{
        id:'0'
      },
      header: 'ثبت تیکت',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.'
        });
        this.allTicketForUser();
      }
    });
  }


  replyComment(id: any, reply: any): void {
    const ref = this.dialogService.open(TicketAddComponent, {
      data: {
        id,
        reply
      },
      header: 'ثبت پاسخ تیکت',
      width: '70%',
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت/ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت/ویرایش شد.'
        });
        this.allTicketForUser();
      }
    });
  }
}
