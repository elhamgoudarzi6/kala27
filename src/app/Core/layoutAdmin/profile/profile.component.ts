import { Router } from '@angular/router';
import { LocalStorageService } from './../../../Auth/localStorageLogin/local-storage.service';
import { MessageService } from 'primeng/api';
import { AdminService } from './../admin.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  public form: FormGroup;
  public usernameForm: FormGroup;
  public passwordForm: FormGroup;
  admin: any;
  errorMessages = {
    adminName: [{ type: 'required', message: 'نام ادمین را وارد کنید.' }]
  };
  usernameErrorMessages = {
    username: [{ type: 'required', message: 'نام کاربری ادمین را وارد کنید.' }],
  };
  passwordRegix = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{9,}$/;
  passwordErrorMessages = {
    password: [
      { type: 'required', message: 'کلمه عبور را وارد کنید.' },
      {
        type: 'minlength',
        message: 'کلمه عبور نمی تواند کمتر از 5 کاراکتر باشد.',
      },
      {
        type: 'pattern',
        message:
          'کلمه عبور باید شامل حروف کوچک و بزرگ لاتین و اعداد و اشکال باشد.',
      },
    ],
    confirmPassword: [
      { type: 'required', message: 'تکرار کلمه عبور را وارد کنید.' },
      {
        type: 'minlength',
        message: 'تکرار کلمه عبور نمی تواند کمتر از 5 کاراکتر باشد.',
      },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private service: AdminService,
    private router: Router,
    private localStorage: LocalStorageService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.localStorage.getCurrentUser() === true) {
      this.admin = this.localStorage.userJson;
    }

    this.createform();
    this.createUsernameForm();
    this.createPasswordForm();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      adminName: new FormControl(this.admin.adminName, [Validators.required]),
      image: new FormControl(this.admin.image),
    });
  }

  createUsernameForm(): void {
    this.usernameForm = this.formBuilder.group({
      username: new FormControl(this.admin.username, [Validators.required]),
    });
  }

  createPasswordForm(): void {
    this.passwordForm = this.formBuilder.group(
      {
        password: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.pattern(this.passwordRegix),
          ])
        ),
        confirmPassword: new FormControl(
          null,
          Validators.compose([Validators.required, Validators.minLength(5)])
        ),
      },
      {
        validators: this.password.bind(this),
      }
    );
  }

  password(formGroup: FormGroup): any {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
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
    this.service
      .editAdmin(this.admin.id, this.form.value)
      .subscribe((response) => {
        if (response.success === true) {
          this.messageService.add({
            severity: 'success',
            summary: ' ثبت اطلاعات ',
            detail: 'برای مشاهده اطلاعات لطفا مجددا وارد شوید.'
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ثبت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  changeUsername(): void {
    this.service
      .changeUsername(this.admin.id, this.usernameForm.value)
      .subscribe((response) => {
        if (response.success === true) {
          this.localStorage.removeCurrentUser();
          this.router.navigateByUrl('/admin');
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ثبت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  changePassword(): void {
    this.service
      .changePassword(this.admin.id, this.passwordForm.value)
      .subscribe((response) => {
        if (response.success === true) {
          this.localStorage.removeCurrentUser();
          this.router.navigateByUrl('/admin');
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
