import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';
import * as moment from 'jalali-moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isExpanded1 = true;
  showSubmenu1 = true;
  isShowing1 = false;

  isExpanded2 = true;
  showSubmenu2 = true;
  isShowing2 = false;

  isExpanded3 = true;
  showSubmenu3 = true;
  isShowing3 = false;

  isExpanded4 = true;
  showSubmenu4 = true;
  isShowing4 = false;

  isLogged = false;
  userType: string = '';
  fullName: string = '';
  profile:any;
  public date = moment(Date.now()).locale('fa').format('YYYY/M/D');
  public time;

  constructor(private breakpointObserver: BreakpointObserver,
              private localStorage: LocalStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.time = moment(Date.now()).locale('fa').format('HH:mm:ss');
    }, 1000);

   this.loadInfoUser();

  }
  loadInfoUser() {
    if (this.localStorage.getCurrentUser() === true) {
      this.fullName = this.localStorage.userJson['fullName'];
      this.profile=this.localStorage.userJson['image'];
    }
  }

  logOut(): void {
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/');
  }

}
