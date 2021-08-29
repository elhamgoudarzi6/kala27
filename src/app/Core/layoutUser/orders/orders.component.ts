import {Component, OnInit} from '@angular/core';
import {UserService} from '../User.service';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';
import {OrdersModel} from './orders.model';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class OrdersComponent implements OnInit {
  cols: any[];
  orderList: any[];
  orderListModel: OrdersModel[];
  productDialog: boolean = false;
  detailOrder: any[];
  count: any;
  displayDialogDelete: boolean = false;
  idOrderForDel: any;

  constructor(private userService: UserService,
              private messageService: MessageService,
              private localStorage: LocalStorageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    if (this.localStorage.getCurrentUser() === true) {
      this.getOrders(this.localStorage.userJson['id'] || this.localStorage.userJson['_id']);
    }
    this.cols = [
      {field: 'ردیف ', header: 'ردیف '},
      {field: 'عکس محصول', header: 'عکس محصول'},
      {field: 'نام محصول', header: 'نام محصول'},
      {field: 'تاریخ سفارش ', header: 'تاریخ سفارش '},
      {field: 'قیمت ', header: 'قیمت '},
      {field: 'توضیحات', header: 'توضیحات '},
      {field: 'وضعیت پرداخت', header: 'وضعیت پرداخت'},
      {field: 'وضعیت سفارش', header: 'وضعیت سفارش'},
      {field: 'ویرایش', header: 'ویرایش'},
      {field: 'حذف', header: 'حذف'},

    ];
  }

  getOrders(id: any) {
    this.userService.getAllOrderByUser(id).subscribe((response) => {
      if (response['success'] === true) {
        this.orderList = response['data'];
        this.orderListModel = response['data'];
        console.log(this.orderListModel);
      }
    });
  }

  deleteOrderUser() {
    this.userService.deleteOrder(this.idOrderForDel).subscribe((response) => {
      if (response['success'] === true) {
        this.getOrders(this.localStorage.userJson['id'] || this.localStorage.userJson['_id']);
        this.messageService.add({severity: 'success', summary: 'موفق', detail: response['data']});

      }
    });
  }

  showDialogEditOrder(id: any) {
    this.productDialog = true;
    this.detailOrder = this.orderListModel.filter(item => item._id === id);
    this.count = this.detailOrder[0]['count'];
  }

  disableDialogEditOrder() {
    this.productDialog = false;
  }

  updateOrder(idOrder: any) {
    let data = {
      count: this.count
    };
    this.userService.updateOrder(idOrder, data).subscribe((response) => {
      if (response['success'] === true) {
        this.getOrders(this.localStorage.userJson['id'] || this.localStorage.userJson['_id']);
        this.messageService.add({severity: 'success', summary: 'موفق', detail: response['data']});
        this.productDialog = false;
      }
    });

  }

  showDialogDelOrder(idOrder: any) {
    this.displayDialogDelete = true;
    this.idOrderForDel = idOrder;
  }

  closeDialogDelete() {
    this.displayDialogDelete = false;
  }
}
