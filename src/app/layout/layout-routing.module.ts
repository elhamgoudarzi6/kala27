import {HomeComponent} from './home/home.component';
import {ProductsComponent} from './products/products.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from './about/about.component';
import {FaqComponent} from './faq/faq.component';
import {ContactComponent} from './contact/contact.component';
import {NewsComponent} from './news/news.component';
import {NewsDetailsComponent} from './news-details/news-details.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {CartComponent} from "./cart/cart.component";
import {OrderFactorsComponent} from "./order-factors/order-factors.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'faq', component: FaqComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'news', component: NewsComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'news-detail/:id',
    component: NewsDetailsComponent
  },
  {
    path: 'products/:cat/:sub/:subSub',
    component: ProductsComponent
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailsComponent
  },
  {
    path:'orderFactor/:success',
    component: OrderFactorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}

