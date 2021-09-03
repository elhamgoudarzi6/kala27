import { SharedmodulesModule } from './../../SharedModules/sharedmodules.module';
import { CommentReplyDialogComponent } from './comments/comment-reply-dialog/comment-reply-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './../../layout/layout.module';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LayoutadminRoutingModule } from './layoutadmin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryAddDialogComponent } from './categories/category-add-dialog/category-add-dialog.component';
import { CategoryEditDialogComponent } from './categories/category-edit-dialog/category-edit-dialog.component';
import { SubCategoryAddDialogComponent } from './categories/sub-category-add-dialog/sub-category-add-dialog.component';
import { SubCategoryEditDialogComponent } from './categories/sub-category-edit-dialog/sub-category-edit-dialog.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ProductsComponent } from './products/products.component';
import { ProductAddDialogComponent } from './products/product-add-dialog/product-add-dialog.component';
import { ProductEditDialogComponent } from './products/product-edit-dialog/product-edit-dialog.component';
import { BlogAddDialogComponent } from './blogs/blog-add-dialog/blog-add-dialog.component';
import { BlogEditDialogComponent } from './blogs/blog-edit-dialog/blog-edit-dialog.component';
import { CommentsComponent } from './comments/comments.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { AdminAddDialogComponent } from './administrators/admin-add-dialog/admin-add-dialog.component';
import { AdminEditDialogComponent } from './administrators/admin-edit-dialog/admin-edit-dialog.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { DiscountAddDialogComponent } from './discounts/discount-add-dialog/discount-add-dialog.component';
import { DiscountEditDialogComponent } from './discounts/discount-edit-dialog/discount-edit-dialog.component';
import { UserAddDialogComponent } from './users/user-add-dialog/user-add-dialog.component';
import { UserEditDialogComponent } from './users/user-edit-dialog/user-edit-dialog.component';
import { ContactFormMessagesComponent } from './contact-form-messages/contact-form-messages.component';
import { SubscriptionUsersComponent } from './subscription-users/subscription-users.component';
import { UserDetailsDialogComponent } from './users/user-details-dialog/user-details-dialog.component';
import { ProductDetailsDialogComponent } from './products/product-details-dialog/product-details-dialog.component';
import { BlogDetailsDialogComponent } from './blogs/blog-details-dialog/blog-details-dialog.component';
import { AdminChangePasswordDialogComponent } from './administrators/admin-change-password-dialog/admin-change-password-dialog.component';
import { AdminChangeUsernameDialogComponent } from './administrators/admin-change-username-dialog/admin-change-username-dialog.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqAddDialogComponent } from './faqs/faq-add-dialog/faq-add-dialog.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogAddDialogComponent } from './catalog/catalog-add-dialog/catalog-add-dialog.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SubSubCategoryAddDialogComponent } from './categories/sub-sub-category-add-dialog/sub-sub-category-add-dialog.component';
import { SubSubCategoryEditDialogComponent } from './categories/sub-sub-category-edit-dialog/sub-sub-category-edit-dialog.component';
import { SlidersComponent } from './sliders/sliders.component';
import { BannersComponent } from './banners/banners.component';
import { BannerAddDialogComponent } from './banners/banner-add-dialog/banner-add-dialog.component';
import { SliderAddDialogComponent } from './sliders/slider-add-dialog/slider-add-dialog.component';
import { SliderEditDialogComponent } from './sliders/slider-edit-dialog/slider-edit-dialog.component';
import { BannerEditDialogComponent } from './banners/banner-edit-dialog/banner-edit-dialog.component';
import {NgxPrintModule} from "ngx-print";
import {FactorOrdersComponent} from "./orders/factor-orders/factor-orders.component";
import { TicketComponent } from './ticket/ticket.component';
import { TicketReplyDialogComponent } from './ticket/ticket-reply-dialog/ticket-reply-dialog.component';
import { SendCostComponent } from './send-cost/send-cost.component';
@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    CategoriesComponent,
    CategoryAddDialogComponent,
    CategoryEditDialogComponent,
    SubCategoryAddDialogComponent,
    SubCategoryEditDialogComponent,
    BlogsComponent,
    ProductsComponent,
    ProductAddDialogComponent,
    ProductEditDialogComponent,
    BlogAddDialogComponent,
    BlogEditDialogComponent,
    CommentsComponent,
    AdministratorsComponent,
    AdminAddDialogComponent,
    AdminEditDialogComponent,
    DiscountsComponent,
    UsersComponent,
    OrdersComponent,
    DiscountAddDialogComponent,
    DiscountEditDialogComponent,
    UserAddDialogComponent,
    UserEditDialogComponent,
    ContactFormMessagesComponent,
    SubscriptionUsersComponent,
    UserDetailsDialogComponent,
    ProductDetailsDialogComponent,
    BlogDetailsDialogComponent,
    AdminChangePasswordDialogComponent,
    AdminChangeUsernameDialogComponent,
    ResetPasswordComponent,
    CommentReplyDialogComponent,
    ProfileComponent,
    FaqsComponent,
    FaqAddDialogComponent,
    CatalogComponent,
    CatalogAddDialogComponent,
    SubSubCategoryAddDialogComponent,
    SubSubCategoryEditDialogComponent,
    SlidersComponent,
    BannersComponent,
    BannerAddDialogComponent,
    SliderAddDialogComponent,
    SliderEditDialogComponent,
    BannerEditDialogComponent,
    FactorOrdersComponent,
    TicketComponent,
    TicketReplyDialogComponent,
    SendCostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutadminRoutingModule,
    LayoutModule,
    HttpClientModule,
    PdfViewerModule,
    SharedmodulesModule,
    NgxPrintModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [DashboardComponent],
  entryComponents: [
    CategoryEditDialogComponent,
    CategoryAddDialogComponent,
    SubCategoryAddDialogComponent,
    SubCategoryEditDialogComponent,
    SubSubCategoryAddDialogComponent,
    SubSubCategoryEditDialogComponent,
    ProductAddDialogComponent,
    ProductEditDialogComponent,
    ProductDetailsDialogComponent,
    BlogAddDialogComponent,
    BlogEditDialogComponent,
    BlogDetailsDialogComponent,
    AdminAddDialogComponent,
    AdminEditDialogComponent,
    AdminChangePasswordDialogComponent,
    AdminChangeUsernameDialogComponent,
    UserAddDialogComponent,
    UserEditDialogComponent,
    UserDetailsDialogComponent,
    DiscountAddDialogComponent,
    DiscountEditDialogComponent,
    CommentReplyDialogComponent,
    FaqAddDialogComponent,
    CatalogAddDialogComponent,
    BannerAddDialogComponent,
    SliderAddDialogComponent,
    SliderEditDialogComponent,
    BannerEditDialogComponent
  ],
})
export class LayoutadminModule {}
