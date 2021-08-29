import { AdminService } from './../../admin.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-add-dialog',
  templateUrl: './blog-add-dialog.component.html',
  styleUrls: ['./blog-add-dialog.component.scss'],
  providers: [MessageService]
})
export class BlogAddDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    title: [{ type: 'required', message: 'عنوان خبر را وارد کنید.' }],
    brief: [{ type: 'required', message: 'خلاصه خبر را وارد کنید.' }],
    details: [{ type: 'required', message: 'جزییات خبر را وارد کنید.' }],
    image: [{ type: 'required', message: 'تصویر خبر را آپلود کنید.' }],
    date: [{type: 'required', message: 'تاریخ خبر را وارد کنید.'}],
  };

  constructor(
    private formBuilder: FormBuilder,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public messageService: MessageService,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      brief: new FormControl(null, [Validators.required]),
      details: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      keywords: new FormControl(null),
      imageDescription: new FormControl(null),
      metaDescription: new FormControl(null),
      date: new FormControl(null,[Validators.required]),
      tags: new FormControl(null)
    });
  }

  imageUploader(event): void {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.form.controls.image.setValue(response.imagePath);
        this.messageService.add({
          severity: 'success',
          summary: ' آپلود تصویر خبر ',
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

  submitForm(): void {
    let keywords = this.form.controls.keywords.value;
    this.form.controls.keywords.setValue(keywords.toString());

    this.service.addNews(this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

}
