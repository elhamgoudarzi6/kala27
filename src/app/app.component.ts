import { NgxSpinnerService } from 'ngx-spinner';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'فروشگاه کالا 27';
  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit() {
    // this.spinner.show().then(r =>console.log(r) );

    setTimeout(() => {
      /** spinner ends after 3 seconds */
      this.spinner.hide();
    }, 1000);
  }
  ngAfterViewInit(): void {
    this.spinner.show();
  }
}
