import { AdminChangeUsernameDialogComponent } from './admin-change-username-dialog/admin-change-username-dialog.component';
import { AdminChangePasswordDialogComponent } from './admin-change-password-dialog/admin-change-password-dialog.component';
import { AdminAddDialogComponent } from './admin-add-dialog/admin-add-dialog.component';
import { AdminEditDialogComponent } from './admin-edit-dialog/admin-edit-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.scss'],
  providers: [
    MessageService, ConfirmationService, DialogService
  ]
})
export class AdministratorsComponent implements OnInit {
  administrators: any[];

  constructor(private messageService: MessageService,
              private service: AdminService,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getAdministrators();

  }

  getAdministrators(): any{

    this.service.getAllAdmininstrators().subscribe((response) => {
      if (response.success === true) {
        this.administrators = response.data;

      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  showEditAdminDialog(id: string): void {
    let admin = this.administrators.filter(x => x._id == id)[0];

    const ref = this.dialogService.open(AdminEditDialogComponent, {
      data: {
        admin
      },
      header: 'ویرایش ادمین',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.'
        });
        this.getAdministrators();
      }
    });
  }

  showChangeAdminUsernameDialog(id: string): void {
    const ref = this.dialogService.open(AdminChangeUsernameDialogComponent, {
      data: {
        id
      },
      header: 'تغییر نام کاربری',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.'
        });
        this.getAdministrators();
      }
    });
  }

  showChangeAdminPasswordDialog(id: string): void {
    const ref = this.dialogService.open(AdminChangePasswordDialogComponent, {
      data: {
        id
      },
      header: 'تغییر رمزعبور',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.'
        });
        this.getAdministrators();
      }
    });
  }

  showAddAdminDialog(): void {
    const ref = this.dialogService.open(AdminAddDialogComponent, {
      header: 'ثبت ادمین',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.'
        });
        this.getAdministrators();
      }
    });
  }

  deleteAdmin(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteAdmin(id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({severity: 'success', summary: ' حذف اطلاعات ', detail: response.data});
            this.getAdministrators();
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
