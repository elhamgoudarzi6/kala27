import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../localStorageLogin/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  private userType;

  constructor(private localstorage: LocalStorageService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.localstorage.getCurrentUser() === true) {
      this.userType = this.localstorage.userJson['type'];
      if (this.userType === 'user') {
        return true;
      } else {
        this.router.navigate(['/admin']);
        return false;
      }

    }
  }

}
