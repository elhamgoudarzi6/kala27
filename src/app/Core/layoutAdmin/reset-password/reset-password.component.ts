import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from './../../../Auth/localStorageLogin/local-storage.service';
import { AdminService } from './../admin.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [MessageService]
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  isLogged = false;
  showPassword = false;
  password = '';
  errorMessages = {
    username: [{ type: 'required', message: 'نام کاربری را وارد کنید.' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private service: AdminService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();

    if (this.isLogged) {
      this.router.navigate(['/admin/panel']);
    }

    this.form = this.formBuilder.group({
      username: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
    });
  }

  resetPassword(): void {
    this.service.resetPassword(this.form.value).subscribe((response) => {

      if (response.success === true) {
        this.showPassword = true;
        this.password = response.newpass;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' ورود ',
          detail: response.data,
        });
      }
    });
  }
}
