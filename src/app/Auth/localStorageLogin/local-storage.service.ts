import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public userData: any;
  public userToken: any;
  public userJson: any;
  public userType: any;

  constructor() {
// this.removeCurrentUser()
  }

  saveCurrentUser(data: any) {
    localStorage.setItem('currentUser', data);
  }

  getCurrentUser(): boolean {

    this.userData = localStorage.getItem('currentUser');
    this.userJson = JSON.parse(this.userData);
    if (this.userData !== undefined && this.userData !== null) {
      this.userJson = JSON.parse(this.userData);
      this.userType = this.userJson['type'];
      return true;
    } else {
      return false;
    }
  }

  removeCurrentUser(): void {
    // alert('del');
    localStorage.removeItem('currentUser');

  }
}

