import { AdminService } from './../../admin.service';
import { MessageService } from 'primeng/api';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './product-add-dialog.component.html',
  styleUrls: ['./product-add-dialog.component.scss'],
  providers: [MessageService],
})
export class ProductAddDialogComponent implements OnInit {
  public form: FormGroup;
  categories: any[] = [];
  subCategories: any[] = [];
  subSubCategories: any[] = [];
  discounts: any[] = [];
  colors: any[] = [];
  featureValues: any[] = [];
  errorMessages = {
    categoryID: [
      { type: 'required', message: 'دسته بندی اول محصول را انتخاب کنید.' },
    ],
    subCategoryID: [
      { type: 'required', message: 'دسته بندی دوم محصول را انتخاب کنید.' },
    ],
    subSubCategoryID: [
      { type: 'required', message: 'دسته بندی سوم محصول را انتخاب کنید.' },
    ],
    discountID: [{ type: 'required', message: 'تخفیف محصول را انتخاب کنید.' }],
    title: [{ type: 'required', message: 'عنوان محصول را وارد کنید.' }],
    image: [{ type: 'required', message: 'تصویر محصول را آپلود کنید.' }],
  };

  info: any[] = [];
  public color: any;
  public image: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public messageService: MessageService,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getDiscounts();
    this.getColors();
    this.createform();
  }

  getCategories(): any {
    this.service.getAllCategories().subscribe((response) => {
      if (response.success === true) {
        this.categories = response.data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  getDiscounts(): any {
    this.service.getAllDiscounts().subscribe((response) => {
      if (response.success === true) {
        this.discounts = response.data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  getColors(): any {
    this.service.getAllColors().subscribe((response) => {
      if (response.success === true) {
        this.colors = response.data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  onCategory(e: any) {
    this.form.controls.categoryID.setValue(e.value._id);
    this.subCategories = e.value.SubCategory;
  }

  onSubCategory(e: any) {
    this.form.controls.subCategoryID.setValue(e.value._id);
    this.subSubCategories = e.value.SubSubCategory;
  }

  onSubSubCategory(e: any) {
    this.form.controls.subSubCategoryID.setValue(e.value._id);
  }

  onColor(e: any){
    this.color = e.value;
  }

  onDiscount(e: any) {
    this.form.controls.discountID.setValue(e.value._id);
    if (e.value.discountPercent != 0) {
      this.form.controls.discountStatus.setValue(true);
    } else {
      this.form.controls.discountStatus.setValue(false);
    }
  }

  createform(): void {
    this.form = this.formBuilder.group({
      categoryID: new FormControl(null, [Validators.required]),
      subCategoryID: new FormControl(null, [Validators.required]),
      subSubCategoryID: new FormControl(null, [Validators.required]),
      discountID: new FormControl(null, [Validators.required]),
      discountStatus: new FormControl(false),
      title: new FormControl(null, [Validators.required]),
      price: new FormControl(null),
      detail: new FormControl(null),
      features: new FormControl(null),
      image: new FormControl(null, [Validators.required]),
      help: new FormControl(null),
      // sendCost: new FormControl(null),
      info: new FormControl(null),
      keywords: new FormControl(null),
      imageDescription: new FormControl(null),
      metaDescription: new FormControl(null),
    });
  }

  imageUploader(event): void {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        console.log(response)
        this.form.controls.image.setValue(response.imagePath);

        this.messageService.add({
          severity: 'success',
          summary: ' آپلود تصویر محصول ',
          detail: 'تصویر با موفقیت آپلود شد.',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' آپلود تصویر محصول ',
          detail: response.data,
        });
      }
    });
  }

  colorImageUploader(event): void {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.image = formData;
    this.messageService.add({
      severity: 'success',
      summary: ' آپلود تصویر ',
      detail: 'تصویر با موفقیت آپلود شد',
    });
  }

  addFeature(feature, value): void {
    let dup = false;
    if (feature != '' && value != '') {
      this.featureValues.forEach((item) => {
        if (item.feature == feature && item.value == value) {
          dup = true;
        }
      });
      if (!dup) {
        this.featureValues.push({
          feature: feature,
          featureValues: value,
        });
      }
    }
  }

  deleteFeature(index: any) {
    this.featureValues.splice(index, 1);
  }

  addInfo(price: any, number: any) {
    let dup = false;
    if (
      this.color != '' &&
      price != '' &&
      number != '' &&
      this.image != ''
    ) {
      this.colors.forEach((item) => {
        if (item.colorCode == this.color.code) {
          dup = true;
        }
      });
      if (!dup) {

        let imageAddress : any;
        this.service.uploadFile(this.image).subscribe((response) => {
          if (response.success === true) {
            imageAddress = response.imagePath;

            this.info.push({
              color: this.color.color,
              price: price,
              colorCode: this.color.code,
              image: imageAddress,
              initialNumber: number,
              remainsNumber: number,
            });

            this.messageService.add({
              severity: 'success',
              summary: ' اطلاعات رنگ محصول ',
              detail: 'اطلاعات رنگ محصول با موفقیت ثبت شد.',
            });

          } else {
            this.messageService.add({
              severity: 'error',
              summary: ' اطلاعات رنگ محصول ',
              detail: response.data,
            });
          }
        });
      }
    }
  }

  deleteInfo(index: any) {
    this.info.splice(index, 1);
  }

  submitForm(): void {
    let priceList: any[] = [];
    this.info.forEach((item) => {
      priceList.push(item.price);
    });

    let minPrice = Math.min(...priceList);

    this.form.controls.price.setValue(minPrice);
    this.form.controls.features.setValue(this.featureValues);
    this.form.controls.info.setValue(this.info);

    this.service.addProduct(this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' محصول با موفقیت ثبت شد ',
          detail: response.data,
        });
        this.ref.close(true);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' ثبت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }
}
