import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutuserRoutingModule } from './layoutuser-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SharedmodulesModule} from '../../SharedModules/sharedmodules.module';
import { OrdersComponent } from './orders/orders.component';
import {ProfileComponent} from './profile/profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ContentDashboardComponent } from './content-dashboard/content-dashboard.component';
import {NgOtpInputModule} from "ng-otp-input";
import { FactorOrdersComponent } from './factor-orders/factor-orders.component';
import {NgxPrintModule} from "ngx-print";
import { TicketComponent } from './ticket/ticket.component';
import { TicketAddComponent } from './ticket/ticket-add/ticket-add.component';



@NgModule({
  declarations: [
    DashboardComponent,
    OrdersComponent,
    ProfileComponent,
    ContentDashboardComponent,
    FactorOrdersComponent,
    TicketComponent,
    TicketAddComponent
  ],
    imports: [
        CommonModule,
        LayoutuserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedmodulesModule,
        NgOtpInputModule,
        NgxPrintModule,
    ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class LayoutuserModule { }
