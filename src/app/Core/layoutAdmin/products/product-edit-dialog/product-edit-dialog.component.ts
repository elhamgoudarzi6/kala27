import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AfterViewChecked, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.scss'],
})
export class ProductEditDialogComponent implements OnInit, AfterViewChecked {
  public form: FormGroup;
  displayFeature: boolean = false;
  displayColor: boolean = false;
  categories: any[] = [];
  subCategories: any[] = [];
  subSubCategories: any[] = [];
  discounts: any[] = [];
  colors: any[] = [];
  featureValues: any[] = [];
  product: any;
  keywords: string;
  selectedCat: any;
  selectedSub: any;
  selectedSubSub: any;
  selectedDiscount: any;
  featureID:any;
  featureValue:any;
  featureTitle:any;
  colorValue:any;
  colorID:any;
  colorPrice:any;
  remainsNumber:any;
  initialNumber:any;
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
    this.product = this.config.data.product;

    if (this.product.keywords != null) {
      this.keywords = this.product.keywords.split(',');
    }
    this.featureValues = this.product.features;
    this.info = this.product.info;

    this.service.getAllCategories().subscribe((response) => {
      if (response.success === true) {
        this.categories = response.data;

        this.subCategories = response.data.filter(
          (x) => x._id === this.product.categoryID
        )[0].SubCategory;

        this.subSubCategories = this.subCategories.filter(
          (x) => x._id === this.product.subCategoryID
        )[0].SubSubCategory;

        this.selectedCat = response.data.find(
          (x) => x._id === this.product.categoryID
        );

        this.selectedSub = this.subCategories.find(
          (x) => x._id === this.product.subCategoryID
        );

        this.selectedSubSub = this.subSubCategories.find(
          (x) => x._id === this.product.subSubCategoryID
        );
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });

    this.service.getAllDiscounts().subscribe((response) => {
      if (response.success === true) {
        this.discounts = response.data;

        this.selectedDiscount = this.discounts.find(
          (x) => x._id === this.product.discountID
        );
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });

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

    this.form = this.formBuilder.group({
      categoryID: new FormControl(this.selectedCat, [Validators.required]),
      subCategoryID: new FormControl(this.selectedSub, [
        Validators.required,
      ]),
      subSubCategoryID: new FormControl(this.selectedSubSub, [
        Validators.required,
      ]),
      discountID: new FormControl(this.selectedDiscount, [
        Validators.required,
      ]),
      discountStatus: new FormControl(this.product.discountStatus),
      title: new FormControl(this.product.title, [Validators.required]),
      price: new FormControl(this.product.price),
      detail: new FormControl(this.product.detail),
      features: new FormControl(this.featureValues),
      image: new FormControl(this.product.image, [Validators.required]),
      help: new FormControl(this.product.help),
      sendCost: new FormControl(this.product.sendCost),
      info: new FormControl(this.product.info),
      keywords: new FormControl(this.keywords),
      imageDescription: new FormControl(this.product.imageDescription),
      metaDescription: new FormControl(this.product.metaDescription),
    });
  }

  ngAfterViewChecked(): void {
    this.form.controls.categoryID.setValue(this.selectedCat._id);
    this.form.controls.subCategoryID.setValue(this.selectedSub._id);
    this.form.controls.subSubCategoryID.setValue(this.selectedSubSub._id);
    this.form.controls.discountID.setValue(this.selectedDiscount._id);
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

  onColor(e: any) {
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

  imageUploader(event): void {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
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
    if (this.color != '' && price != '' && number != '' && this.image != '') {
      this.colors.forEach((item) => {
        if (item.colorCode == this.color.code) {
          dup = true;
        }
      });
      if (!dup) {
        let imageAddress: any;
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
          } else {
            this.messageService.add({
              severity: 'error',
              summary: ' آپلود تصویر محصول ',
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

    console.log(this.form.value);

    this.service.editProduct(this.product._id, this.form.value).subscribe((response) => {
      if (response.success === true) {
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
  showDialogFeature(id:any) {
    this.featureID=id;
    let result =  this.featureValues.filter(x => x._id == this.featureID);
    this.featureTitle=result[0].feature;
    this.featureValue=result[0].featureValues;
    this.displayFeature = true;
  }
  updateFeature(item){
    let result =  this.featureValues.filter(x => x._id == this.featureID);
    let index = this.featureValues.indexOf(result[0]);

    result[0].featureValues = this.featureValue;
    result[0].feature = this.featureTitle;
    this.featureValues[index] =  result[0];
    this.messageService.add({
      severity: 'success',
      summary: 'ویرایش',
      detail: 'ویژگی با موفقیت ویرایش شد.',
      life:1000
    });
    this.displayFeature = false;
  }
  showDialogColor(id:any) {
    this.colorID=id;
    let result =  this.info.filter(x => x._id == this.colorID);
    this.colorValue=result[0].color;
    this.remainsNumber=result[0].remainsNumber;
    this.initialNumber=result[0].initialNumber;
    this.colorPrice=result[0].price;
    this.image=result[0].image;
    this.displayColor = true;
  }

  updateColor(){
    let result =  this.info.filter(x => x._id == this.colorID);
    let index = this.info.indexOf(result[0]);
    let imageUrl:any;
    this.service.uploadFile(this.image).subscribe((response) => {
      if (response.success === true) {
        imageUrl = response.imagePath;
        result[0].color = this.colorValue;
        result[0].remainsNumber = this.remainsNumber;
        result[0].initialNumber = this.initialNumber;
        result[0].price = this.colorPrice;
        result[0].image=imageUrl;
        this.info[index] =  result[0];
        this.messageService.add({
          severity: 'success',
          summary: 'ویرایش',
          detail: 'رنگ با موفقیت ویرایش شد.',
          life:1000
        });
        this.displayColor = false;
      }
    })

  }

}
