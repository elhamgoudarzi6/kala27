import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-sub-category-edit-dialog',
  templateUrl: './sub-sub-category-edit-dialog.component.html',
  styleUrls: ['./sub-sub-category-edit-dialog.component.scss'],
  providers: [
    MessageService
  ]
})
export class SubSubCategoryEditDialogComponent implements OnInit {
  categories: any[] = [];
  subCategories: any[] = [];
  selectedSub: any;

  public form: FormGroup;
  errorMessages = {
    title: [
      {type: 'required', message: 'عنوان دسته بندی را وارد کنید.'},
      {type: 'maxlength', message: 'عنوان دسته بندی نمی تواند از 500 کاراکتر بیشتر باشد.'}
    ],
    subCategoryID: [
      {type: 'required', message: 'دسته بندی دوم را انتخاب کنید'}
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
    this.selectedSub = this.subCategories.find(x => x._id === this.config.data.subId);

    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      subCategoryID: new FormControl(
        this.selectedSub,
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

  submitForm(): void {

    const sub = this.form.controls.subCategoryID.value.id;
    this.form.controls.subCategoryID.setValue(sub);

    console.log(this.config.data.subSubId);
    console.log(this.form.value);

    this.service.editSubSubCategory(this.config.data.subSubId, this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

}
