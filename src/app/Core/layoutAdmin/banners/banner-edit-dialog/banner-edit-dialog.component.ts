import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../Auth/localStorageLogin/local-storage.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-edit-dialog',
  templateUrl: './banner-edit-dialog.component.html',
  styleUrls: ['./banner-edit-dialog.component.scss'],
  providers: [MessageService]
})
export class BannerEditDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    tag: [
      {type: 'required', message: 'تگ بنر را وارد کنید.'}
    ],
    imageurl: [
      {type: 'required', message: 'تصویر بنر را وارد کنید.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private localStorage: LocalStorageService,
              public service: AdminService,
              public messageService: MessageService,
              public config: DynamicDialogConfig,
              public dialogRef: DynamicDialogRef) { }

  ngOnInit(): void {
  //  this.localStorage.isNotSupportUser();
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      link: new FormControl(
        this.config.data.link
      ),
      tag: new FormControl(
        this.config.data.tag,
        [
          Validators.required
        ]
      ),
      imageurl: new FormControl(
        this.config.data.imageurl,
        [
          Validators.required
        ]
      )
    });

  }

  submitForm(): void {
    this.service.editBanner(this.config.data.id ,this.form.value).subscribe((response) => {

      if (response.success === true) {
        this.dialogRef.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

  imageUploader(event): void {
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.service.uploadFile(formData).subscribe((response) => {
      if (response['success'] === true) {
        this.form.controls.imageurl.setValue(response['imagePath']);
        this.messageService.add({
          severity: 'success',
          summary: ' آپلود تصویر بنر ',
          detail: 'تصویر با موفقیت آپلود شد.'
        });
      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر بنر ', detail: response['data']});
      }
    });
  }


}
