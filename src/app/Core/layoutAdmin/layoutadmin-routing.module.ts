import { SlidersComponent } from './sliders/sliders.component';
import { BannersComponent } from './banners/banners.component';
import { CatalogComponent } from './catalog/catalog.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SubscriptionUsersComponent } from './subscription-users/subscription-users.component';
import { OrdersComponent } from './orders/orders.component';
import { ContactFormMessagesComponent } from './contact-form-messages/contact-form-messages.component';
import { UsersComponent } from './users/users.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { CommentsComponent } from './comments/comments.component';
import { ProductsComponent } from './products/products.component';
import { BlogsComponent } from './blogs/blogs.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import {AdminGuard} from '../../Auth/Guard/admin.guard';
import {FactorOrdersComponent} from "./orders/factor-orders/factor-orders.component";
import {TicketComponent} from "./ticket/ticket.component";
import {SendCostComponent} from "./send-cost/send-cost.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,

  },
  {
    path: 'reset',
    component: ResetPasswordComponent,
    canActivate:[AdminGuard]
  },
  {
    path: 'panel',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: TicketComponent,
      },
    ],
    canActivate:[AdminGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'product',
        component: ProductsComponent,
      },
    ],
    canActivate:[AdminGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'category',
        component: CategoriesComponent,
      },
    ],  canActivate:[AdminGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'blog',
        component: BlogsComponent,
      },
    ],  canActivate:[AdminGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'discount',
        component: DiscountsComponent,
      },
    ],  canActivate:[AdminGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'user',
        component: UsersComponent,
      },
    ],  canActivate:[AdminGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'contact',
        component: ContactFormMessagesComponent,
      },
    ],  canActivate:[AdminGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'order',
        component: OrdersComponent,
      },
    ],  canActivate:[AdminGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'subscription',
        component: SubscriptionUsersComponent,
      },
    ],  canActivate:[AdminGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'comment',
        component: CommentsComponent,
      },
    ],  canActivate:[AdminGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'admin',
        component: AdministratorsComponent,
      },
    ],  canActivate:[AdminGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],  canActivate:[AdminGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'faq',
        component: FaqsComponent,
      },
    ],  canActivate:[AdminGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'catalog',
        component: CatalogComponent,
      },
    ],  canActivate:[AdminGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [{
      path: 'slider',
      component: SlidersComponent
    }]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [{
      path: 'banner',
      component: BannersComponent
    }]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [{
      path: 'factorOrders/:id',
      component: FactorOrdersComponent
    }]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [{
      path: 'ticket',
      component: TicketComponent
    }]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [{
      path: 'sendCost',
      component: SendCostComponent
    }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutadminRoutingModule {}
