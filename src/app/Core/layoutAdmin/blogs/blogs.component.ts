import { BlogDetailsDialogComponent } from './blog-details-dialog/blog-details-dialog.component';
import { BlogAddDialogComponent } from './blog-add-dialog/blog-add-dialog.component';
import { BlogEditDialogComponent } from './blog-edit-dialog/blog-edit-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  providers: [
    MessageService, ConfirmationService, DialogService
  ]
})
export class BlogsComponent implements OnInit {

  blogs: any[];

  constructor(private messageService: MessageService,
              private service: AdminService,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getBlogs();

  }

  getBlogs(): any{

    this.service.getAllNews().subscribe((response) => {
      if (response.success === true) {
        this.blogs = response.data;

      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }



  showEditBlogDialog(id: string): void {
    let blog = this.blogs.filter(x => x._id == id)[0];

    const ref = this.dialogService.open(BlogEditDialogComponent, {
      data: {
        blog
      },
      header: 'ویرایش خبر',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.'
        });
        this.getBlogs();
      }
    });
  }
  showDetailsBlogDialog(id: string): void {
    let blog = this.blogs.filter(x => x._id == id)[0];

    const ref = this.dialogService.open(BlogDetailsDialogComponent, {
      data: {
        blog
      },
      header: 'مشاهده اطلاعات خبر',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.getBlogs();
      }
    });
  }

  showAddBlogDialog(): void {
    const ref = this.dialogService.open(BlogAddDialogComponent, {
      header: 'ثبت خبر',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.'
        });
        this.getBlogs();
      }
    });
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
            this.confirmationService.close();
            this.messageService.add({severity: 'success', summary: ' حذف اطلاعات ', detail: response.data});
            this.getBlogs();
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
