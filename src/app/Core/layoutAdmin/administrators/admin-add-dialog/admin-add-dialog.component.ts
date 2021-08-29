import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-add-dialog',
  templateUrl: './admin-add-dialog.component.html',
  styleUrls: ['./admin-add-dialog.component.scss'],
  providers: [MessageService],
})
export class AdminAddDialogComponent implements OnInit {
  public form: FormGroup;
  passwordRegix = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{9,}$/;
  errorMessages = {
    username: [{ type: 'required', message: 'نام کاربری ادمین را وارد کنید.' }],
    password: [
      {type: 'required', message: 'کلمه عبور را وارد کنید.'},
      {type: 'minlength', message: 'کلمه عبور نمی تواند کمتر از 5 کاراکتر باشد.'},
      {type: 'pattern', message: 'کلمه عبور باید شامل حروف کوچک و بزرگ لاتین و اعداد و اشکال باشد.'}
    ],
    confirmPassword: [
      {type: 'required', message: 'تکرار کلمه عبور را وارد کنید.'},
      {type: 'minlength', message: 'تکرار کلمه عبور نمی تواند کمتر از 5 کاراکتر باشد.'}
    ],
    adminName: [{ type: 'required', message: 'نام ادمین را وارد کنید.' }],
    type: [{ type: 'required', message: 'نوع ادمین را انتخاب کنید.' }],
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
      adminName: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      username: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      image: new FormControl(
        null
      ),
      type: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      password: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(this.passwordRegix)
        ])
      ),
      confirmPassword: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      )
    }, {
      validators: this.password.bind(this)
    });
  }

  password(formGroup: FormGroup): any {
    const {value: password} = formGroup.get('password');
    const {value: confirmPassword} = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : {passwordNotMatch: true};
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
    this.service.addAdmin(this.form.value).subscribe((response) => {
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
}
