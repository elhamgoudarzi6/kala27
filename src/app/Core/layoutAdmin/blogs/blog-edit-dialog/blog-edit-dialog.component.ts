import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-edit-dialog',
  templateUrl: './blog-edit-dialog.component.html',
  styleUrls: ['./blog-edit-dialog.component.scss'],
  providers: [MessageService]
})
export class BlogEditDialogComponent implements OnInit {

  public form: FormGroup;
  blog: any;
  keywords: string[];
  tags: string[];
  errorMessages = {
    title: [{ type: 'required', message: 'عنوان خبر را وارد کنید.' }],
    brief: [{ type: 'required', message: 'خلاصه خبر را وارد کنید.' }],
    details: [{ type: 'required', message: 'جزییات خبر را وارد کنید.' }],
    image: [{ type: 'required', message: 'تصویر خبر را آپلود کنید.' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public messageService: MessageService,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.blog = this.config.data.blog;
    if(this.blog.keywords != ''){
      this.keywords = this.blog.keywords.split(',');
    }

    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(this.blog.title, [Validators.required]),
      brief: new FormControl(this.blog.brief, [Validators.required]),
      details: new FormControl(this.blog.details, [Validators.required]),
      image: new FormControl(this.blog.image, [Validators.required]),
      keywords: new FormControl(this.keywords),
      tags: new FormControl(this.blog.tags),
      imageDescription: new FormControl(this.blog.imageDescription),
      metaDescription: new FormControl(this.blog.metaDescription)
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

    this.service.editNews(this.blog._id, this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }
}
