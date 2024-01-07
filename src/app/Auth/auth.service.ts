import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  registerUser(data: any): Observable<any> {
    return this.http.post('https://api.kala27.com/api/v1/user/registerUser', data);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post('https://api.kala27.com/api/v1/user/loginUser', data);
  }

  resetPasswordUser(data: any) {
    return this.http.put('https://api.kala27.com/api/v1/user/resetPassword', data);
  }

  changePasswordUser(id: any) {
    return this.http.get('https://api.kala27.com/api/v1/user/changePassword/' + id);
  }

  getUser(id: any) {
    return this.http.get('https://api.kala27.com/api/v1/user/getUser/' + id);
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
}
