import { CatalogAddDialogComponent } from './catalog-add-dialog/catalog-add-dialog.component';
import { AdminService } from './../admin.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class CatalogComponent implements OnInit {
  catalogs: any[] = [];
  path: any;
  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getCatalog();
  }

  getCatalog(): any {
    this.service.getCatalog().subscribe((response) => {
      if (response.success === true) {
        this.catalogs = response.data;
        if(this.catalogs.length > 0){
          this.path = this.catalogs[0].path;
          console.log(this.path);

        }
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  showAddCatalogDialog(): void {
    let list: any[] = [];
    this.catalogs.forEach((item) => {
      list.push(item._id);
    });
    const ref = this.dialogService.open(CatalogAddDialogComponent, {
      data: {
        list,
      },
      header: 'ثبت کاتالوگ',
      width: '70%',
    });

    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
        this.getCatalog();
      }
    });
  }

  deleteCatalog(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteCatalog(id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
            this.getCatalog();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
          }
        });
      },
      reject: () => {
        // close
        this.confirmationService.close();
      },
    });
  }
}
