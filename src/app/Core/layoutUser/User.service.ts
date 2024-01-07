import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private  http: HttpClient) {
  }

  onDisplayBasket(data: any) {
    return this.http.post('https://api.kala27.com/api/v1/user/basketList', data);
  }

  getPayment(data: any) {
    return this.http.post('https://api.kala27.com/api/v1/user/getPayment', data);
  }

  getUser(id: any) {
    return this.http.get('https://api.kala27.com/api/v1/user/getUser/'+id);
  }

  updateUser(id: any, data: any) {
    return this.http.put('https://api.kala27.com/api/v1/user/updateUser/'+id, data);
  }

  changePasswordUser(id: any, data: any) {
    return this.http.put('https://api.kala27.com/api/v1/user/changePassword/' + id, data);
  }

  uploadProfileFile(image: any) {
    return this.http.post('https://api.kala27.com/api/v1/user/upload', image);
  }

  getOrder(orderId: any) {
    return this.http.get('https://api.kala27.com/api/v1/user/getOrder/' + orderId);
  }

  getAllOrderByUser(userId: any): any {
    return this.http.get('https://api.kala27.com/api/v1/user/getAllOrderByUser/' + userId);
  }
  deleteOrder(orderID: any) {
    return this.http.delete('https://api.kala27.com/api/v1/user/deleteOrder/' + orderID);
  }
  updateOrder(orderID: any,data:any) {
    return this.http.put('https://api.kala27.com/api/v1/user/updateOrder/' + orderID,data);
  }
  getDetailOrder(orderID: any) {
    return this.http.get('https://api.kala27.com/api/v1/user/getOrder/' + orderID);
  }
  changeMobileNumber(id: any, data: any) {
    return this.http.put('https://api.kala27.com/api/v1/user/changeMobileNumber/' + id, data);
  }
  findMobile(data: any) {
    return this.http.post('https://api.kala27.com/api/v1/user/findMobile/' ,data);
  }
  sendCodeToEmail(data: any) {
    return this.http.post('https://api.kala27.com/api/v1/user/sendCodeToEmail', data);
  }
  //#ticket
  allTicketForUser(id:any): any {
    return this.http.get('https://api.kala27.com/api/v1/user/allTicketForUser/'+id);
  }
  replyTicket(id: any, data: any): any {
    return this.http.put(
      'https://api.kala27.com/api/v1/user/replyTicket/' + id,
      data
    );
  }
  registerTicket( data: any): any {
    return this.http.post(
      'https://api.kala27.com/api/v1/user/registerTicket/', data
    );
  }
  getSendCost(): any{
    return this.http.get('https://api.kala27.com/api/v1/user/getSendCost');
  }
}
