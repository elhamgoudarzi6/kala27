import { BannerEditDialogComponent } from './banner-edit-dialog/banner-edit-dialog.component';
import { BannerAddDialogComponent } from './banner-add-dialog/banner-add-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { LocalStorageService } from './../../../Auth/localStorageLogin/local-storage.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class BannersComponent implements OnInit {

  Banners: any[] = [];
  constructor(private service: AdminService,
              private  messageService: MessageService,
              public dialogService: DialogService,
              private localStorage: LocalStorageService,
              private  confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    //this.localStorage.isNotSupportUser();
    this.getBanners();
  }

  getBanners(): any{
    this.service.getBanners().subscribe((response) => {
      if (response.success === true) {
        this.Banners = response.data;
      }
    });
  }
  showAddBannerDialog(): void {
    const ref = this.dialogService.open(BannerAddDialogComponent, {
      header: 'ثبت بنر جدید',
      width: '70%'
    });
    ref.onClose.subscribe(res => {
      if (res === true){
        this.getBanners();
      }
    });
  }
  showEditBannerDialog(id: any, link: string, tag: string, imageurl: string): void {
    const ref = this.dialogService.open(BannerEditDialogComponent, {
      data: {
        id,
        link,
        tag,
        imageurl
      },
      header: 'ویرایش بنر',
      width: '70%',
      contentStyle: {"direction": "rtl"}
    });
    ref.onClose.subscribe(res => {
      if (res === true){
        this.getBanners();
      }
    });
  }

  deleteBanner(id: any): void{
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteBanner(id).subscribe((response) => {
          if (response.success === true) {
            this.messageService.add({severity: 'success', summary: ' حذف ', detail: response.data});
            this.ngOnInit();
          }
          else{
            this.messageService.add({severity: 'error', summary: ' حذف ', detail: response.data});
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
