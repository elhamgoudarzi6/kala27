import { LocalStorageService } from './../../../Auth/localStorageLogin/local-storage.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLogged = false;
  loginErrorMessages = {
    username: [{ type: 'required', message: 'نام کاربری را وارد کنید.' }],
    password: [{ type: 'required', message: 'کلمه عبور را وارد کنید.' }],
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

    if (this.isLogged && this.localStorage.userToken=='admin') {
        this.router.navigate(['/admin/panel']);
    }

    this.loginForm = this.formBuilder.group({
      username: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      password: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
    });
  }

  login(): void {
    this.service.login(this.loginForm.value).subscribe((response) => {
      if (response.success === true) {
        this.localStorage.saveCurrentUser(JSON.stringify(response.data));
        this.router.navigateByUrl('/admin/panel');
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
