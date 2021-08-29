import { ProductDetailsDialogComponent } from './product-details-dialog/product-details-dialog.component';
import { ProductAddDialogComponent } from './product-add-dialog/product-add-dialog.component';
import { ProductEditDialogComponent } from './product-edit-dialog/product-edit-dialog.component';
import { AdminService } from './../admin.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [
    MessageService, ConfirmationService, DialogService
  ]
})
export class ProductsComponent implements OnInit {

  products: any[];

  constructor(private messageService: MessageService,
              private service: AdminService,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): any{
    this.service.getAllProducts().subscribe((response) => {
      if (response.success === true) {
        this.products = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  showEditProductDialog(id: string): void {
    let product = this.products.filter(x => x._id == id)[0];

    const ref = this.dialogService.open(ProductEditDialogComponent, {
      data: {
        product
      },
      header: 'ویرایش محصول',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.'
        });
        this.getProducts();
      }
    });
  }

  showDetailsProductDialog(id: string): void {
    let product = this.products.filter(x => x._id == id)[0];

    const ref = this.dialogService.open(ProductDetailsDialogComponent, {
      data: {
        product
      },
      header: 'مشاهده اطلاعات محصول',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.getProducts();
      }
    });
  }

  showAddProductDialog(): void {
    const ref = this.dialogService.open(ProductAddDialogComponent, {
      header: 'ثبت محصول',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.'
        });
        this.getProducts();
      }
    });
  }

  deleteProduct(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteProduct(id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({severity: 'success', summary: ' حذف اطلاعات ', detail: response.data});
            this.getProducts();
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
            this.getProducts();
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
            this.getProducts();
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
            this.getProducts();
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
