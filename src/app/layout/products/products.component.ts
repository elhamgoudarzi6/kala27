import { LayoutService } from './../layout.service';
import { MenuItem, MessageService } from 'primeng/api';
import { LocalStorageService } from './../../Auth/localStorageLogin/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [MessageService],
})
export class ProductsComponent implements OnInit {
  public products: any[] = [];
  public items = [];
  public pageOfItems: Array<any>;
  countOfProduct = 0;

  categories: any[] = [];
  menuCategories: MenuItem[] = [];
  currentCategory: any;
  currentSubCategory: any;
  currentSubSubCategory: any;
  displaySort = false;
  displayFilter = false;
  displayBasic: boolean;
  priceList: number[] = [];
  categoryId: any;
  subCategoryId: any;
  subSubCategoryId: any;
  isLogged: boolean;
  sortId = 1;
  offer = false;

  constructor(
    private router: Router,
    private service: LayoutService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('cat');
      this.subCategoryId = params.get('sub');
      this.subSubCategoryId = params.get('subSub');
    });

    this.service.getAllCategory().subscribe((response) => {
      if (response.success === true) {
        this.categories = response.data;

        if (this.categoryId !== '0') {
          this.currentCategory = this.categories.filter(
            (x) => x._id === this.categoryId
          )[0];

          if (this.subCategoryId !== '0') {
            this.currentSubCategory = this.currentCategory.SubCategory.filter(
              (x) => x._id === this.subCategoryId
            )[0];

            if (this.subSubCategoryId !== '0') {
              this.currentSubSubCategory = this.currentSubCategory.SubSubCategory.filter(
                (x) => x._id === this.subSubCategoryId
              )[0];
            }

          }
        }
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت دسته بندی ',
          detail: response.data,
        });
      }
    });

    let data;
    if (this.subSubCategoryId === '0' && this.subCategoryId === '0' && this.categoryId === '0') {
      data = {
        updatedAt: -1,
      };
    } else if (this.categoryId !== '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
      data = {
        categoryID: this.categoryId,
        updatedAt: -1,
      };
    } else if (this.categoryId !== '0' && this.subCategoryId !== '0' && this.subSubCategoryId === '0'){
      data = {
        categoryID: this.categoryId,
        subCategoryID: this.subCategoryId,
        updatedAt: -1,
      };
    } else if (this.categoryId !== '0' && this.subCategoryId !== '0' && this.subSubCategoryId !== '0'){
      data = {
        categoryID: this.categoryId,
        subCategoryID: this.subCategoryId,
        subSubCategoryID: this.subSubCategoryId,
        updatedAt: -1,
      };
    }

    this.service.advanceSearchProduct(data).subscribe((response) => {
      console.log(response);

      if (response.success === true) {
        this.products = response.data;
        this.countOfProduct = this.products.length;
        this.items = Array(this.countOfProduct)
          .fill(0)
          .map((x, i) => ({ id: i }));
      }
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  openFilter(): void {
    this.displayFilter = true;
  }

  openSort(): void {
    this.displaySort = true;
  }

  goDetail(id: any): void {
    this.router.navigate(['/product-detail/' + id]);
  }

  goProduct(categoryId: any, subCategoryId: any, subSubCategoryId: any): any {
    this.router.navigateByUrl(
      '/products/' + categoryId + '/' + subCategoryId + "/" + subSubCategoryId
    );
  }

  hasOffer(): void {
    let data;
    if (this.offer) {
      switch (this.sortId) {
        case 1:
          if (this.categoryId === '0' && this.subCategoryId === '0') {
            data = {
              updatedAt: -1,
              discountStatus: this.offer,
            };
          } else if (this.categoryId !== '0' && this.subCategoryId === '0') {
            data = {
              categoryID: this.categoryId,
              updatedAt: -1,
              discountStatus: this.offer,
            };
          } else {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              updatedAt: -1,
              discountStatus: this.offer,
            };
          }
          break;
        case 2:
          if (this.categoryId === '0' && this.subCategoryId === '0') {
            data = {
              price: 1,
              discountStatus: this.offer,
            };
          } else if (this.categoryId !== '0' && this.subCategoryId === '0') {
            data = {
              categoryID: this.categoryId,
              price: 1,
              discountStatus: this.offer,
            };
          } else {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              price: 1,
              discountStatus: this.offer,
            };
          }
          break;
        case 3:
          if (this.categoryId === '0' && this.subCategoryId === '0') {
            data = {
              price: -1,
              discountStatus: this.offer,
            };
          } else if (this.categoryId !== '0' && this.subCategoryId === '0') {
            data = {
              categoryID: this.categoryId,
              price: -1,
              discountStatus: this.offer,
            };
          } else {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              price: -1,
              discountStatus: this.offer,
            };
          }
          break;
        default:
          if (this.categoryId === '0' && this.subCategoryId === '0') {
            data = {
              updatedAt: -1,
              discountStatus: this.offer,
            };
          } else if (this.categoryId !== '0' && this.subCategoryId === '0') {
            data = {
              categoryID: this.categoryId,
              updatedAt: -1,
              discountStatus: this.offer,
            };
          } else {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              updatedAt: -1,
              discountStatus: this.offer,
            };
          }
          break;
      }
    } else {
      switch (this.sortId) {
        case 1:
          if (this.categoryId === '0' && this.subCategoryId === '0') {
            data = {
              updatedAt: -1,
            };
          } else if (this.categoryId !== '0' && this.subCategoryId === '0') {
            data = {
              categoryID: this.categoryId,
              updatedAt: -1,
            };
          } else {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              updatedAt: -1,
            };
          }
          break;
        case 2:
          if (this.categoryId === '0' && this.subCategoryId === '0') {
            data = {
              price: 1,
            };
          } else if (this.categoryId !== '0' && this.subCategoryId === '0') {
            data = {
              categoryID: this.categoryId,
              price: 1,
            };
          } else {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              price: 1,
            };
          }
          break;
        case 3:
          if (this.categoryId === '0' && this.subCategoryId === '0') {
            data = {
              price: -1,
            };
          } else if (this.categoryId !== '0' && this.subCategoryId === '0') {
            data = {
              categoryID: this.categoryId,
              price: -1,
            };
          } else {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              price: -1,
            };
          }
          break;
        default:
          if (this.categoryId === '0' && this.subCategoryId === '0') {
            data = {
              updatedAt: -1,
            };
          } else if (this.categoryId !== '0' && this.subCategoryId === '0') {
            data = {
              categoryID: this.categoryId,
              updatedAt: -1,
            };
          } else {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              updatedAt: -1,
            };
          }
          break;
      }
    }

    this.service.advanceSearchProduct(data).subscribe((response) => {
      if (response.success === true) {
        this.products = response.data;

        this.countOfProduct = response.data.length;
        this.items = Array(this.countOfProduct)
          .fill(0)
          .map((x, i) => ({ id: i }));
        this.pageOfItems = undefined;
      }
    });
  }

  sort(sortId: any): void {
    this.sortId = sortId;
    let data;
    switch (sortId) {
      case 1:
        if (this.categoryId === '0' && this.subCategoryId === '0') {
          data = {
            updatedAt: -1,
          };
        } else if (this.categoryId !== '0' && this.subCategoryId === '0') {
          data = {
            categoryID: this.categoryId,
            updatedAt: -1,
          };
        } else {
          data = {
            categoryID: this.categoryId,
            subCategory: this.subCategoryId,
            updatedAt: -1,
          };
        }
        break;
      case 2:
        if (this.categoryId === '0' && this.subCategoryId === '0') {
          data = {
            price: 1,
          };
        } else if (this.categoryId !== '0' && this.subCategoryId === '0') {
          data = {
            categoryID: this.categoryId,
            price: 1,
          };
        } else {
          data = {
            categoryID: this.categoryId,
            subCategory: this.subCategoryId,
            price: 1,
          };
        }
        break;
      case 3:
        if (this.categoryId === '0' && this.subCategoryId === '0') {
          data = {
            price: -1,
          };
        } else if (this.categoryId !== '0' && this.subCategoryId === '0') {
          data = {
            categoryID: this.categoryId,
            price: -1,
          };
        } else {
          data = {
            categoryID: this.categoryId,
            subCategory: this.subCategoryId,
            price: -1,
          };
        }
        break;
    }

    this.service.advanceSearchProduct(data).subscribe((response) => {
      if (response.success === true) {
        this.products = response.data;

        this.countOfProduct = response.data.length;
        this.items = Array(this.countOfProduct)
          .fill(0)
          .map((x, i) => ({ id: i }));
        this.pageOfItems = undefined;
      }
    });
  }
}
