import { AdminService } from './../admin.service';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class OrdersComponent implements OnInit {
  orders: any[];
  statuses: SelectItem[];
  statusOrder: any;
  postTrackingCode: any;
  sendCost:number=0;
  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.statuses = [
      { label: 'ثبت سفارش', value: 'ثبت سفارش' },
      { label: 'تایید سفارش', value: 'تایید سفارش' },
      { label: 'در حال ارسال', value: 'در حال ارسال' },
      { label: 'ارسال شد', value: 'ارسال شد' },
      { label: 'تحویل داده شد', value: 'تحویل داده شد' },
    ];

    this.getOrders();
    this.getCost();
  }

  getOrders(): any {
    this.service.getAllOrders().subscribe((response) => {
      if (response.success === true) {
        this.orders = response.data;
        console.log(this.orders)
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  deleteOrder(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteOrder(id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
            this.getOrders();
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

  onRowEditSave(id: any) {
    let formData: any;
    formData = {
      statusOrder: this.statusOrder,
      postTrackingCode: this.postTrackingCode,
    };

    this.service.editOrder(id, formData).subscribe((response) => {
      if (response.success === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.',
        });
        this.getOrders();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' ویرایش اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  onRowEditInit(status: any) {
    this.statusOrder = status;
  }
  getCost() {
    this.service.getSendCost().subscribe((res) => {
      if (res['success'] === true) {
        let data = res['data'];
        this.sendCost= data[0].cost;
      }
    })
  }
}
