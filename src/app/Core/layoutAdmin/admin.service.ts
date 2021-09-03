import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  login(data: any): any {
    return this.http.post(
      'https://api.kala27.com/api/v1/admin/loginAdmin',
      data
    );
  }
  changePassword(id: any, data: any): any {
    return this.http.put(
      'https://api.kala27.com/api/v1/admin/changePassword/' + id,
      data
    );
  }
  changeUsername(id: any, data: any): any {
    return this.http.put(
      'https://api.kala27.com/api/v1/admin/changeUsername/' + id,
      data
    );
  }
  resetPassword(data: any): any {
    return this.http.put(
      'https://api.kala27.com/api/v1/admin/resetPassword',
      data
    );
  }
  uploadFile(data: any): any {
    return this.http.post(
      'https://api.kala27.com/api/v1/admin/upload',
      data
    );
  }
  uploadMultiFiles(data: any): any {
    return this.http.post(
      'https://api.kala27.com/api/v1/admin/multiUpload',
      data
    );
  }

  //#region Administrator
  getAllAdmininstrators(): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/getAllAdmin'
    );
  }
  addAdmin(data: any): any {
    return this.http.post(
      'https://api.kala27.com/api/v1/admin/registerAdmin',
      data
    );
  }
  editAdmin(id: any, data: any): any {
    return this.http.put(
      'https://api.kala27.com/api/v1/admin/updateAdmin/' + id,
      data
    );
  }
  deleteAdmin(id: any): any {
    return this.http.delete(
      'https://api.kala27.com/api/v1/admin/deleteAdmin/' + id
    );
  }
  //#endregion

  //#region Categories
  getAllCategories(): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/getAllCategory'
    );
  }

  addCategory(data: any): any {
    return this.http.post(
      'https://api.kala27.com/api/v1/admin/registerCategory',
      data
    );
  }
  editCategory(id: any, data: any): any {
    return this.http.put(
      'https://api.kala27.com/api/v1/admin/updateCategory/' + id,
      data
    );
  }
  deleteCategory(id: any): any {
    return this.http.delete(
      'https://api.kala27.com/api/v1/admin/deleteCategory/' + id
    );
  }

  addSubCategory(data: any): any {
    return this.http.post(
      'https://api.kala27.com/api/v1/admin/registerSubCategory',
      data
    );
  }
  editSubCategory(id: any, data: any): any {
    return this.http.put(
      'https://api.kala27.com/api/v1/admin/updateSubCategory/' + id,
      data
    );
  }
  deleteSubCategory(id: any): any {
    return this.http.delete(
      'https://api.kala27.com/api/v1/admin/deleteSubCategory/' + id
    );
  }

  getAllSubSubCategories(id: any): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/user/getAllSubSubCategory/' + id
    );
  }

  addSubSubCategory(data: any): any {
    return this.http.post(
      'https://api.kala27.com/api/v1/admin/registerSubSubCategory',
      data
    );
  }
  editSubSubCategory(id: any, data: any): any {
    return this.http.put(
      'https://api.kala27.com/api/v1/admin/updateSubSubCategory/' + id,
      data
    );
  }
  deleteSubSubCategory(id: any): any {
    return this.http.delete(
      'https://api.kala27.com/api/v1/admin/deleteSubSubCategory/' + id
    );
  }

  //#endregion

  //#region News
  getAllNews(): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/getAllNews'
    );
  }

  addNews(data: any): any {
    return this.http.post(
      'https://api.kala27.com/api/v1/admin/registerNews',
      data
    );
  }
  editNews(id: any, data: any): any {
    return this.http.put(
      'https://api.kala27.com/api/v1/admin/updateNews/' + id,
      data
    );
  }
  deleteNews(id: any): any {
    return this.http.delete(
      'https://api.kala27.com/api/v1/admin/deleteNews/' + id
    );
  }

  //#endregion

  //#region Products
  getAllProducts(): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/getAllProduct'
    );
  }

  addProduct(data: any): any {
    return this.http.post(
      'https://api.kala27.com/api/v1/admin/registerProduct',
      data
    );
  }
  editProduct(id: any, data: any): any {
    return this.http.put(
      'https://api.kala27.com/api/v1/admin/updateProduct/' + id,
      data
    );
  }
  deleteProduct(id: any): any {
    return this.http.delete(
      'https://api.kala27.com/api/v1/admin/deleteProduct/' + id
    );
  }

  //#endregion

  //#region Comment
  getAllComments(): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/getAllComment'
    );
  }
  commentCount(id: any): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/countComment/' + id
    );
  }
  deleteComment(id: any): any {
    return this.http.delete(
      'https://api.kala27.com/api/v1/admin/deleteComment/' + id
    );
  }
  activeOrDeactiveComment(id: any, data: any): any {
    return this.http.put(
      'https://api.kala27.com/api/v1/admin/activeOrDeactiveComment/' + id,
      data
    );
  }
  replyComment(id: any, data: any): any {
    return this.http.put(
      'https://api.kala27.com/api/v1/admin/replyComment/' + id,
      data
    );
  }
  //#endregion

  getAllColors(): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/getAllColor'
    );
  }
  //#region Discounts
  getAllDiscounts(): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/getAllDiscount'
    );
  }
  addDiscount(data: any): any {
    return this.http.post(
      'https://api.kala27.com/api/v1/admin/registerDiscount',
      data
    );
  }
  editDiscount(id: any, data: any): any {
    return this.http.put(
      'https://api.kala27.com/api/v1/admin/updateDiscount/' + id,
      data
    );
  }
  deleteDiscount(id: any): any {
    return this.http.delete(
      'https://api.kala27.com/api/v1/admin/deleteDiscount/' + id
    );
  }
  //#endregion

  //#region Users
  getAllUsers(): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/getAllUser'
    );
  }
  getUser(id: any): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/getUser/' + id
    );
  }
  addUser(data: any): any {
    return this.http.post(
      'https://api.kala27.com/api/v1/admin/registerUser',
      data
    );
  }
  editUser(id: any, data: any): any {
    return this.http.put(
      'https://api.kala27.com/api/v1/admin/updateUser/' + id,
      data
    );
  }
  deleteUser(id: any): any {
    return this.http.delete(
      'https://api.kala27.com/api/v1/admin/deleteUser/' + id
    );
  }
  //#endregion

  //#region Orders
  getAllOrders(): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/getAllOrder'
    );
  }
  getOrder(id: any): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/getOrder/' + id
    );
  }
  editOrder(id: any, data: any): any {
    return this.http.put(
      'https://api.kala27.com/api/v1/admin/UpdateOrder/' + id,
      data
    );
  }
  deleteOrder(id: any): any {
    return this.http.delete(
      'https://api.kala27.com/api/v1/admin/deleteOrder/' + id
    );
  }
  //#endregion
  //#region ContactFormMessages
  getAllContactFormMessages(): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/getAllContactUs'
    );
  }
  getContactFormMessage(id: any): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/getContactUs/' + id
    );
  }
  deleteContactFormMessage(id: any): any {
    return this.http.delete(
      'https://api.kala27.com/api/v1/admin/deleteContactUs/' + id
    );
  }
  //#endregion

  //#region Subscriptions
  getAllEmailSubscriptions(): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/getEmailSubscription'
    );
  }
  getAllSmsSubscriptions(): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/getSmsSubscription'
    );
  }
  deleteSmsSubscription(id: any): any {
    return this.http.delete(
      'https://api.kala27.com/api/v1/admin/deleteEmailSubscription/' + id
    );
  }
  deleteEmailSubscription(id: any): any {
    return this.http.delete(
      'https://api.kala27.com/api/v1/admin/deleteContactUs/' + id
    );
  }
  //#endregion

  //#region Faqs
  getAllFaqs(): any {
    return this.http.get('https://api.kala27.com/api/v1/admin/getAllFaq');
  }
  addFaq(data: any): any {
    return this.http.post(
      'https://api.kala27.com/api/v1/admin/registerFaq',
      data
    );
  }
  deleteFaq(id: any): any {
    return this.http.delete(
      'https://api.kala27.com/api/v1/admin/deleteFaq/' + id
    );
  }
  //#endregion

  //#region Catalog
  getCatalog(): any {
    return this.http.get(
      'https://api.kala27.com/api/v1/admin/getCatalog'
    );
  }
  addCatalog(data: any): any {
    return this.http.post(
      'https://api.kala27.com/api/v1/admin/registerCatalog',
      data
    );
  }
  deleteCatalog(id: any): any {
    return this.http.delete(
      'https://api.kala27.com/api/v1/admin/deleteCatalog/' + id
    );
  }
  //#endregion


   //#region Sliders-Apis
  getSliders(): any {
    return this.http.get('https://api.kala27.com/api/v1/admin/getAllslider');
  }

  addSlider(data: any): any {
    return this.http.post('https://api.kala27.com/api/v1/admin/registerSlider', data);
  }

  editSlider(id: any, data: any): any {
    return this.http.put('https://api.kala27.com/api/v1/admin/updateSlider/' + id, data);
  }

  deleteSlider(id: any): any {
    return this.http.delete('https://api.kala27.com/api/v1/admin/deleteSlider/' + id);
  }

  //#endregion

  //#region SideBanners-Apis
  getBanners(): any {
    return this.http.get('https://api.kala27.com/api/v1/admin/getAllBanner');
  }

  addBanner(data: any): any {
    return this.http.post('https://api.kala27.com/api/v1/admin/registerBanner', data);
  }

  editBanner(id: any, data: any): any {
    return this.http.put('https://api.kala27.com/api/v1/admin/updateBanner/' + id, data);
  }

  deleteBanner(id: any): any {
    return this.http.delete('https://api.kala27.com/api/v1/admin/deleteBanner/' + id);
  }

  //#endregion

  //#ticket
  getAllTicket(): any {
    return this.http.get('https://api.kala27.com/api/v1/admin/getAllTicket');
  }
  replyTicket(id: any, data: any): any {
    return this.http.put(
      'https://api.kala27.com/api/v1/admin/replyTicket/' + id,
      data
    );
  }
  registerTicket( data: any): any {
    return this.http.post(
      'https://api.kala27.com/api/v1/admin/registerTicket/', data
    );
  }
  getSendCost(): any{
    return this.http.get('https://api.kala27.com/api/v1/admin/getSendCost');
  }
  registerCost(data:any): any{
    return this.http.post('https://api.kala27.com/api/v1/admin/registerSendCost',data);
  }
}
