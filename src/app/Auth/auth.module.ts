import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgOtpInputModule} from 'ng-otp-input';
import {SharedmodulesModule} from '../SharedModules/sharedmodules.module';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [LoginRegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOtpInputModule,
    FormsModule,
    SharedmodulesModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AuthModule { }
