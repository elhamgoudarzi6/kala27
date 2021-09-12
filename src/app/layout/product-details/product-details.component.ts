import { LayoutService } from './../layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from './../../Auth/localStorageLogin/local-storage.service';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import * as moment from 'jalali-moment';
import { CartService } from '../serviceCart/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [MessageService],
})
export class ProductDetailsComponent implements OnInit {
  public form: FormGroup;
  public formComment: FormGroup;
  errorMessages = {
    count: [{ type: 'required', message: 'تعداد سفارش را وارد کنید.' }],
  };
  commentErrorMessages = {
    commentText: [{ type: 'required', message: 'متن پیام را وارد کنید.' }],
  };
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
    navText: [
      '<i class="fa fa-chevron-left fa-2x"></i>',
      '<i class="fa fa-chevron-right fa-2x"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 2,
      },
      940: {
        items: 4,
      },
    },
  };
  responsiveOptions: any[] = [
    {
      breakpoint: '1600px',
      numVisible: 3,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  images: any[] = [];
  currentIndex: any = -1;
  showFlag: any = false;
  featuresValues: any[] = [];
  product: any;
  hasDiscountCode: any = false;
  displayBasic: boolean;
  isLogged: boolean;
  productID: string;
  count: number = 1;
  commentsCount: any = 0;
  colorName: any;
  imageProductColor: any;
  priceColor: any;
  remainsNumberColor: any;
  colorCode: any;
  infID: any;
  priceWithDiscount:any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private service: LayoutService,
    public localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private serviceCart: CartService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();

    this.route.paramMap.subscribe(
      (params) => (this.productID = params.get('id'))
    );

    this.service.getProduct(this.productID).subscribe((response) => {
      if (response.success === true) {
        this.product = response.data[0];
        console.log(response);
        this.colorName = this.product.info[0].color;
        this.imageProductColor = this.product.info[0].image;
        this.priceColor = this.product.info[0].price;
        this.remainsNumberColor = this.product.info[0].remainsNumber;
        this.colorCode = this.product.info[0].colorCode;
        this.infID = this.product.info[0]._id;
        if(this.product.discountStatus){
          this.priceWithDiscount=Number(this.priceColor)-Number(this.product.Discount[0].discountPercent* this.priceColor)/100;
        }
        this.product.Comment.forEach((element) => {
          if (element.active) {
            this.commentsCount++;
          }
        });
        if (this.product.features.length > 0) {
          for (let index = 0; index < this.product.features.length; index++) {
            this.featuresValues.push({
              feature: this.product.features[index].feature,
              value: this.product.features[index].featureValues,
            });
          }
          if (this.product.image != null) {
            this.images.push({
              image: this.product.image,
              thumbnailImageSrc: this.product.image,
              previewImageSrc: this.product.image,
            });
          }
          if (this.product.gallery.length > 0) {
            this.product.gallery.forEach((item) => {
              this.images.push({
                image: item,
                thumbnailImageSrc: item,
                previewImageSrc: item,
              });
            });
          }
        }
      }
    });
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      userID: new FormControl(this.localStorage.userJson['id'], [
        Validators.required,
      ]),
      productID: new FormControl(this.productID, [Validators.required]),
      discountCode: new FormControl(null),
      count: new FormControl(1, [Validators.required]),
      description: new FormControl(null),
      date: new FormControl(null),
    });

    this.formComment = this.formBuilder.group({
      userID: new FormControl(this.localStorage.userJson['id'], [
        Validators.required,
      ]),
      productID: new FormControl(this.productID, [Validators.required]),
      commentText: new FormControl(null, [Validators.required]),
      date: new FormControl(null),
    });
  }

  submitForm(): void {
    if (this.isLogged) {
      const date = moment(Date.now()).locale('fa').format('YYYY/M/D');
      this.form.controls.date.setValue(date);
      this.service.registerOrder(this.form.value).subscribe((response) => {
        if (response.success === true) {
          this.messageService.add({
            severity: 'success',
            summary: ' ثبت سفارش ',
            detail: response.data,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ثبت سفارش ',
            detail: response.data,
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: ' کاربر نامعتبر ',
        detail: 'لطفا ابتدا وارد شوید.',
      });
    }
  }

  registerComment() {
    this.service
      .registerComment(this.formComment.value)
      .subscribe((response) => {
        if (response['success'] === true) {
          this.ngOnInit();
          this.messageService.add({
            severity: 'success',
            summary: 'موفق',
            detail: response['data'],
          });
        }
      });
  }

  showLightbox(index) {
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }

  goProduct(categoryId: any, subCategoryId: any, subSubCategoryId: any): any {
    this.router.navigateByUrl(
      '/products/' + categoryId + '/' + subCategoryId + '/' + subSubCategoryId
    );
  }

  getColorName(i: any, j: any) {
    this.infID = i._id;
    this.colorName = i.color;
    this.imageProductColor = i.image;
    this.priceColor = i.price;
    this.colorCode = i.colorCode;
    this.remainsNumberColor = i.remainsNumber;
    if(this.product.discountStatus){
      this.priceWithDiscount=Number(this.priceColor)-Number(this.product.Discount[0].discountPercent* this.priceColor)/100;
    }

  }

  addCart(product: any): void {
    if (this.remainsNumberColor > 0) {
      const list = {
        id: product._id,
        infoID: this.infID,
        name: product.title,
        colorCode: this.colorCode,
        image: this.imageProductColor,
        price: this.priceColor,
        discountCode: product.Discount[0].discountCode,
        discountPercent: product.Discount[0].discountPercent,
        number: 1,
        sendCost: product.sendCost,
      };
      this.displayBasic = true;
      this.serviceCart.addToCart(list);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: ' موجودی کالا  ',
        detail: 'کالا موجود نیست',
      });
    }
  }
  goCart(): void {
    this.displayBasic = !this.displayBasic;
    this.router.navigate(['/cart']);
  }
}
