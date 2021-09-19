import {Component, OnInit, HostListener} from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {LayoutService} from "../layout.service";
import {ProductModel} from "../product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isShow: boolean;
  topPosToStartShowing = 100;
  currencyInfo$: Observable<ProductModel[]>;
  constructor(private service:LayoutService) {

  }

  ngOnInit(): void {
   this.service.getAllCurrencies().subscribe((response)=>{
      console.log(response)
    });

  }

  @HostListener('window:scroll')
  checkScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
