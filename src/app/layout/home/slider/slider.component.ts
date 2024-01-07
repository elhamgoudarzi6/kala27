import { LayoutService } from './../../layout.service';
import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  customOptions: OwlOptions = {
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 5000,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    nav: true,
    navText: ['<i class="fa fa-chevron-left fa-2x"></i>', '<i class="fa fa-chevron-right fa-2x"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    }
  };
  sliders: any[] = [];
  sideBanners: any[] = [];

  constructor(private service: LayoutService) {
  }

  ngOnInit(): void {
    this.service.getSliders().subscribe((response) => {
      if (response.success === true) {
        this.sliders = response.data;
      }
    });

    this.service.getBanners().subscribe((response) => {
      if (response.success === true) {
        this.sideBanners = response.data;
      }
    });
  }

}
