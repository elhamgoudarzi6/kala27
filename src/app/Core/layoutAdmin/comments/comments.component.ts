import { CommentReplyDialogComponent } from './comment-reply-dialog/comment-reply-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [
    MessageService, ConfirmationService, DialogService
  ]
})
export class CommentsComponent implements OnInit {

  comments: any[];

  constructor(private messageService: MessageService,
              private service: AdminService,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): any{
    this.service.getAllComments().subscribe((response) => {
      if (response.success === true) {
        this.comments = response.data;

      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  activeComment(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از فعالسازی دیدگاه انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // active comment
        this.service.activeOrDeactiveComment(id, {active: true}).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({severity: 'success', summary: ' فعالسازی دیدگاه ', detail: response.data});
            this.getComments();
          } else {
            this.messageService.add({severity: 'error', summary: ' فعالسازی دیدگاه ', detail: response.data});
          }
        });
      },
      reject: () => {
        // close
        this.confirmationService.close();
      }
    });
  }

  deactiveComment(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از غیرفعالساری دیدگاه انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // deactive comment
        this.service.activeOrDeactiveComment(id, {active: false}).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({severity: 'success', summary: ' غیرفعالساری دیدگاه ', detail: response.data});
            this.getComments();
          } else {
            this.messageService.add({severity: 'error', summary: ' غیرفعالساری دیدگاه ', detail: response.data});
          }
        });
      },
      reject: () => {
        // close
        this.confirmationService.close();
      }
    });
  }

  deleteComment(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteComment(id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({severity: 'success', summary: ' حذف اطلاعات ', detail: response.data});
            this.getComments();
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

  replyComment(id: any, reply: any): void {
    const ref = this.dialogService.open(CommentReplyDialogComponent, {
      data: {
        id,
        reply
      },
      header: 'ثبت/ویرایش پاسخ دیدگاه',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت/ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت/ویرایش شد.'
        });
        this.getComments();
      }
    });
  }
}
