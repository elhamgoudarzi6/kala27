import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog-add-dialog',
  templateUrl: './catalog-add-dialog.component.html',
  styleUrls: ['./catalog-add-dialog.component.scss'],
  providers: [
    MessageService
  ]
})
export class CatalogAddDialogComponent implements OnInit {

  public list : any[] = [];
  public form: FormGroup;
  errorMessages = {
    question: [
      {type: 'path', message: 'فایل را آپلود کنید.'},
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private service: AdminService,
              public ref: DynamicDialogRef,
              public messageService: MessageService,
              public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.list = this.config.data.list;
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      path: new FormControl(
        null,
        [
          Validators.required
        ]
      )
    });
  }

  fileUploader(event): void {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.form.controls.path.setValue(response.imagePath);
        this.messageService.add({
          severity: 'success',
          summary: ' آپلود فایل کاتالوگ ',
          detail: 'فایل با موفقیت آپلود شد.',
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

  submitForm(): void {
    console.log(this.config.data.list);
    console.log(this.list.length);

    if(this.list.length > 0) {
      this.list.forEach(item => {
        this.service.deleteCatalog(item).subscribe();
      });
    }
    this.service.addCatalog(this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

}
