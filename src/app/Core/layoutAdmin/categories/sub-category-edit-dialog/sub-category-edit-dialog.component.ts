import { MessageService } from 'primeng/api';
import { AdminService } from './../../admin.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-sub-category-edit-dialog',
  templateUrl: './sub-category-edit-dialog.component.html',
  styleUrls: ['./sub-category-edit-dialog.component.scss'],
  providers: [MessageService]
})
export class SubCategoryEditDialogComponent implements OnInit {

  categories: any[] = [];
  subCategories: any[] = [];

  selectedCat: any;
  selectedSub: any;

  public form: FormGroup;
  errorMessages = {
    title: [
      {type: 'required', message: 'عنوان دسته بندی را وارد کنید.'},
      {type: 'maxlength', message: 'عنوان دسته بندی نمی تواند از 500 کاراکتر بیشتر باشد.'}
    ],
    categoryID: [
      {type: 'required', message: 'دسته بندی اول را انتخاب کنید'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private service: AdminService,
              public messageService: MessageService,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.categories = this.config.data.categories;
    this.subCategories = this.categories.find(x => x._id === this.config.data.catId).SubCategory;

    this.selectedCat = this.categories.find(x => x._id === this.config.data.catId);
    this.selectedSub = this.subCategories.find(x => x._id === this.config.data.subId);

    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      categoryID: new FormControl(
        this.selectedCat,
        [
          Validators.required
        ]
      ),
      title: new FormControl(
        this.config.data.title,
        [
          Validators.required,
          Validators.maxLength(500)
        ]
      )
    });
  }


  getSubCategory(e: any) {
    let category = e.value;
    this.subCategories = category.SubCategory;
  }

  submitForm(): void {
    this.service.editSubCategory(this.config.data.subId, this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

}
