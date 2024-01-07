import { LocalStorageService } from './../../../../Auth/localStorageLogin/local-storage.service';
import { AdminService } from './../../admin.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-edit-dialog',
  templateUrl: './slider-edit-dialog.component.html',
  styleUrls: ['./slider-edit-dialog.component.scss'],
  providers: [MessageService]
})
export class SliderEditDialogComponent implements OnInit {



  public form: FormGroup;
  errorMessages = {
    tag: [
      {type: 'required', message: 'تگ اسلایدر را وارد کنید.'}
    ],
    imageurl: [
      {type: 'required', message: 'تصویر اسلایدر را وارد کنید.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              public service: AdminService,
              private localStorage: LocalStorageService,
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
    this.service.editSlider(this.config.data.id ,this.form.value).subscribe((response) => {

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
          summary: ' آپلود تصویر اسلایدر ',
          detail: 'تصویر با موفقیت آپلود شد.'
        });
      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر اسلایدر ', detail: response['data']});
      }
    });
  }

}
