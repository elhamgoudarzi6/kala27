import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private http: HttpClient) {
  }

  getSliders(): any {
    return this.http.get('https://api.kala27.com/api/v1/user/getAllSlider');
  }

  getBanners(): any {
    return this.http.get('https://api.kala27.com/api/v1/user/getAllBanner');
  }

  // #region category
  getAllCategory(): any {
    return this.http.get('https://api.kala27.com/api/v1/user/getAllCategory');
  }

  allProductBySubCategoryID(id: any): any {
    return this.http.get('https://api.kala27.com/api/v1/user/allProductBySubCategoryID/' + id);
  }

//#endregion

  // #region news
  getAllNews(): any {
    return this.http.get('https://api.kala27.com/api/v1/user/getAllNews');
  }

  getLatestNews(): any {
    return this.http.get('https://api.kala27.com/api/v1/user/getLatestNews');
  }

  getNews(id: any): any {
    return this.http.get('https://api.kala27.com/api/v1/user/getNews/' + id);
  }

  getAllTagNews(): any {
    return this.http.get('https://api.kala27.com/api/v1/user/getAllTagNews');
  }
  // #endregion

  // #region products
  getDiscountProduct(): any {
    return this.http.get('https://api.kala27.com/api/v1/user/discountProduct');
  }

  getNewestProduct(): any {
    return this.http.get('https://api.kala27.com/api/v1/user/newestProduct');
  }

  getProduct(id: any): any {
    return this.http.get('https://api.kala27.com/api/v1/user/getProduct/' + id);
  }

  getAllProduct(): any {
    return this.http.get('https://api.kala27.com/api/v1/user/getAllProduct');
  }

  allCommentForProduct(id: any): any {
    return this.http.get('https://api.kala27.com/api/v1/user/allCommentForProduct/' + id);
  }

  countComment(id: any): any {
    return this.http.get('https://api.kala27.com/api/v1/user/countComment/' + id);
  }

  registerComment(data: any): any {
    return this.http.post('https://api.kala27.com/api/v1/user/registerComment', data);
  }

  registerOrder(data: any): any {
    return this.http.post('https://api.kala27.com/api/v1/user/registerOrder', data);
  }

  addSmsSubscription(data: any): any {
    return this.http.post('https://api.kala27.com/api/v1/user/addSmsSubscription', data);
  }

  addEmailSubscription(data: any): any {
    return this.http.post('https://api.kala27.com/api/v1/user/addEmailSubscription', data);
  }

  getAllFaq(): any {
    return this.http.get('https://api.kala27.com/api/v1/user/getAllFaq');
  }

  postContactUs(data: any) {
    return this.http.post('https://api.kala27.com/api/v1/user/registerContactUs', data);
  }

  advanceSearchProduct(data: any): any {
    return this.http.post('https://api.kala27.com/api/v1/user/advanceSearchProduct', data);
  }
  getAllCatalog(): any {
    return this.http.get('https://api.kala27.com/api/v1/user/getCatalog');
  }
  getUserInfo(id: any) {
    return this.http.get('https://api.kala27.com/api/v1/user/getUser/' + id);
  }
  updateUser(id: any, data: any) {
    return this.http.put('https://api.kala27.com/api/v1/user/updateUser/' + id, data);
  }
  onPayment(data: any): any {
    return this.http.post('https://api.kala27.com/api/v1/user/payment', data);
  }
  getTokenSms() {
    let data = {
      UserApiKey: 'f2a1c337366e0cd3ddffc337',
      SecretKey: 'it66)%#teBC!@*&'
    };
    return this.http.post('https://RestfulSms.com/api/Token', data);
  }

  sendSms(data: any, token: any) {
    const headers = {
      'content-type': 'application/json',
      'x-sms-ir-secure-token': token
    }

    return this.http.post('https://RestfulSms.com/api/UltraFastSend', data, {'headers': headers});
  }
  getinfoRefID(RefID: any) {
    return this.http.get('https://api.kala27.com/api/v1/user/getinfoRefID/'+ RefID);
  }
  getSendCost(): any{
    return this.http.get('https://api.kala27.com/api/v1/user/getSendCost');
  }
}
