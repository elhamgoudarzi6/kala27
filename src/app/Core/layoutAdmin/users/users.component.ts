import { UserDetailsDialogComponent } from './user-details-dialog/user-details-dialog.component';
import { UserAddDialogComponent } from './user-add-dialog/user-add-dialog.component';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';
import { AdminService } from './../admin.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [
    MessageService, ConfirmationService, DialogService
  ]
})
export class UsersComponent implements OnInit {
  users: any[];

  constructor(private messageService: MessageService,
              private service: AdminService,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getUsers();

  }

  getUsers(): any{
    this.service.getAllUsers().subscribe((response) => {
      if (response.success === true) {
        this.users = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  showEditUserDialog(id: string): void {
    let user = this.users.filter(x => x._id == id)[0];

    const ref = this.dialogService.open(UserEditDialogComponent, {
      data: {
        user
      },
      header: 'ویرایش کاربر',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.'
        });
        this.getUsers();
      }
    });
  }

  shoeDetailsUserDialog(id: string): void {
    let user = this.users.filter(x => x._id == id)[0];

    const ref = this.dialogService.open(UserDetailsDialogComponent, {
      data: {
        user
      },
      header: 'مشاهده اطلاعات کاربر',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.getUsers();
      }
    });
  }

  showAddUserDialog(): void {
    const ref = this.dialogService.open(UserAddDialogComponent, {
      header: 'ثبت کاربر',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.'
        });
        this.getUsers();
      }
    });
  }

  deleteUser(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteUser(id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({severity: 'success', summary: ' حذف اطلاعات ', detail: response.data});
            this.getUsers();
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
