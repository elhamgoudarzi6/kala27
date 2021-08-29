import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AdminService } from './../../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-details-dialog',
  templateUrl: './blog-details-dialog.component.html',
  styleUrls: ['./blog-details-dialog.component.scss'],
  providers: [
    MessageService, ConfirmationService
  ]
})
export class BlogDetailsDialogComponent implements OnInit {

  blog: any;
  keywords: string[];

  constructor(
    private service: AdminService,
    public ref: DynamicDialogRef,
    public messageService: MessageService,
    public config: DynamicDialogConfig,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.blog = this.config.data.blog;

    if(this.blog.keywords != ''){
      this.keywords = this.blog.keywords.split(',');
    }
  }

  deleteBlog(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteNews(id).subscribe((response) => {
          if (response.success === true) {
            // close
            this.ref.close(true);
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

  return():void{
    // close
    this.ref.close();
  }

}
