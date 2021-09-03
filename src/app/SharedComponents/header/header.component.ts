import {LayoutService} from './../../layout/layout.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import set = Reflect.set;
import {LocalStorageService} from '../../Auth/localStorageLogin/local-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Post} from '../post';
import {SearchService} from '../search.service';
import {CartService} from '../../layout/serviceCart/cart.service';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('productMenu') productMenu: ElementRef;

  public displayMobileMenu: boolean = false;
  public displayBasket: boolean = false;
  public displaySearch: boolean = false;
  post: Post[];
  categories: any[] = [];
  selectedCategoryID: any;
  selectedSubCategoryID: any;
  selectedSubCategories: any[] = [];
  showCartList: boolean = false;
  items: MenuItem[];
  mobileMenuCategories: MenuItem[] = [];
  pathCatalog: any;
  cartlist: any[] = [];
  sumOfPrice = 0;
  pricePercent=0;
  countBadge = 0;
  visible = true;
  sendCost: any;
  isLogged: boolean = false;
  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];

  constructor(
    private route: Router,
    private service: LayoutService,
    public localStorage: LocalStorageService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private dataService: SearchService,
    private serviceCart: CartService
  ) {
  }

  showMobileMenu(): void {
    this.displayMobileMenu = true;
  }

  showBasket() {
    this.displayBasket = !this.displayBasket;
  }

  showSearch() {
    this.displaySearch = !this.displaySearch;
  }

  goProduct(categoryId: any, subCategoryId: any, subSubCategoryId: any): any {
    this.router.navigateByUrl(
      '/products/' + categoryId + '/' + subCategoryId + '/' + subSubCategoryId
    );
  }

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();
    setInterval(() => {
      this.getAllPrice();
    }, 1000);
    // this.spinner.show();
    this.getCatalog();
    this.service.getAllCategory().subscribe((response) => {
      if (response.success === true) {
        this.categories = response.data;

        let subList: MenuItem[];
        let subSubList: MenuItem[];

        this.mobileMenuCategories.push({
          label: 'همه محصولات',
          command: (event) => this.goProduct(0, 0, 0),
        });

        this.categories.forEach((cat) => {
          subList = [];
          if (cat.SubCategory.length > 0) {
            subList.push({
              label: 'همه',
              command: (event) => this.goProduct(cat._id, 0, 0),
            });
            cat.SubCategory.forEach((sub) => {
              subSubList = [];

              if (sub.SubSubCategory.length > 0) {
                subSubList.push({
                  label: 'همه',
                  command: (event) => this.goProduct(cat._id, sub._id, 0),
                });

                sub.SubSubCategory.forEach((subSub) => {
                  subSubList.push({
                    label: subSub.title,
                    command: (event) =>
                      this.goProduct(cat._id, sub._id, subSub._id),
                  });
                });
              }
              subList.push({
                label: sub.title,
                items: subSubList,
              });
            });
            this.mobileMenuCategories.push({
              label: cat.title,
              items: subList,
            });
          } else {
            this.mobileMenuCategories.push({
              label: cat.title,
              command: (event) => this.goProduct(cat._id, 0, 0),
            });
          }
        });
      }
    });
    this.items = [
      {
        label: 'صفحه اصلی',
        icon: 'pi pi-pw pi-home',
        command: (event) => this.route.navigate(['/']),
      },
      {
        label: 'محصولات',
        icon: 'pi pi-fw pi-list',
        items: this.mobileMenuCategories,
      },
      {
        label: 'سوالات متداول',
        icon: 'pi pi-fw pi-question-circle',
        command: (event) => this.route.navigate(['/faq']),
      },
      {
        label: 'اخبار',
        icon: 'pi pi-fw pi-tags',
        command: (event) => this.route.navigate(['/news']),
      },
      {
        label: 'درباره ما',
        icon: 'pi pi-fw pi-info-circle',
        command: (event) => this.route.navigate(['/about']),
      },
      {
        label: 'تماس با ما',
        icon: 'pi pi-fw pi-phone',
        command: (event) => this.route.navigate(['/contact']),
      },
    ];
    this.spinner.hide();
    var pc = document.getElementById('pcHeader');
    if (pc !== null) {
      var pcSticky = pc.offsetTop;
    }
    var mobile = document.getElementById('mobileHeader');
    if (mobile !== null) {
      var mobileSticky = mobile.offsetTop;
    }

    function myFunction() {
      if (pc !== undefined) {
        if (window.pageYOffset > pcSticky) {
          pc.classList.add('sticky');
        } else {
          pc.classList.remove('sticky');
        }
      }
      if (mobile !== undefined) {
        if (window.pageYOffset > mobileSticky) {
          mobile.classList.add('sticky');
        } else {
          mobile.classList.remove('sticky');
        }
      }
    }

    window.onscroll = function () {
      myFunction();
    };
  }

  getAllPrice() {
    this.dataService.getSendCost().subscribe((res)=>{
      if(res['success']===true){
        let data=res['data']
        this.sendCost=data[0].cost;
      }
    })
    this.cartlist = this.serviceCart.getItems();
    if (this.cartlist != null) {
      this.sumOfPrice = 0;
      this.sendCost = 0;
      this.countBadge = 0;
      if (this.cartlist != null) {
        if (this.cartlist.length > 0) {
          this.showCartList = true;
          for (var i = 0; i < this.cartlist.length; i++) {
            if (this.cartlist[i].discountPercent) {
              let pricePercent: number =
                (this.cartlist[i].price *
                  this.cartlist[i].number *
                  this.cartlist[i].discountPercent) /
                100;
              this.pricePercent=pricePercent;
              // this.sumOfPrice +=
              //   Number(this.cartlist[i].price * this.cartlist[i].number) -
              //   pricePercent +
              //   this.cartlist[i].sendCost;
              this.sumOfPrice +=
                Number(this.cartlist[i].price * this.cartlist[i].number) -
                pricePercent ;
              this.sendCost += this.cartlist[i].sendCost;
            } else {
              this.sumOfPrice +=
                this.cartlist[i].price * this.cartlist[i].number;
              this.sendCost += this.cartlist[i].sendCost;
            }
            // let count = Number(this.cartlist[i]['product']['number']) * Number(this.cartlist[i]['product']['cartList'].price);
            // this.sumOfPrice += count;
            this.countBadge++;
          }
        }
        this.showCartList = false;
      }
    } else {
      this.cartlist = [];
    }
  }

  onDeleteCart(item: any): void {
    this.serviceCart.deleteItem(item);
    this.cartlist = this.serviceCart.getItems();
    this.getAllPrice();
  }

  goPanel() {
    console.log(this.localStorage.getCurrentUser());
    console.log(this.localStorage.userData);
    if (this.localStorage.getCurrentUser() === true && this.localStorage.userType === 'user') {
      this.router.navigate(['user/panel']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  openProductsMenu(): void {
    this.getProductSubMenu(this.categories[0].id);
    this.productMenu.nativeElement.classList.add('show');
  }

  closeProductsMenu(): void {
    this.selectedSubCategories = [];
    this.productMenu.nativeElement.classList.remove('show');
  }

  getProductSubMenu(id): void {
    this.selectedCategoryID = id;
    this.selectedSubCategories = this.categories.find(
      (item) => item._id == id
    ).SubCategory;
  }

  clearProductSubMenu(): void {
    this.selectedSubCategories = [];
  }

  getCatalog() {
    this.service.getAllCatalog().subscribe((response) => {
      if (response['success'] === true) {
        let result = response['data'][0];
        this.pathCatalog = result.path;
      }
    });
  }

  onSelectedFilter(e) {
    this.getFilteredExpenseList();
  }

  getFilteredExpenseList() {
    if (this.dataService.searchOption.length > 0) {
      this.post = this.dataService.filteredListOptions();
    } else {
      this.post = this.dataService.postsData;
    }
  }

  gotoCart() {
    // alert(this.showCartList)
    if (
      this.isLogged &&
      this.cartlist.length > 0 &&
      this.localStorage.userType == 'user'
    ) {
      this.route.navigate(['cart']);
    } else {
      this.route.navigate(['/register']);
    }
  }
}
