import {Injectable, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ItemCart} from './itemCart';

let itemsInCart = [];
let cart = [];
let subject = new Subject<any>();

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: ItemCart;

  constructor() {
    // localStorage.removeItem('cartList');
  }

  addToCart(Product: any) {
    let local_Storage;
    let itemsInCart = [];
    this.items = {
      id: Product.id,
      infoID:Product.infoID,
      name:Product.name,
      colorCode:Product.colorCode,
      image:Product.image,
      price:Product.price,
      discountCode:Product.discountCode,
      discountPercent:Product.discountPercent,
      number:1,
      sendCost:Product.sendCost
    };

    if (localStorage.getItem('cartList') === null) {
      itemsInCart.push(this.items);
      localStorage.setItem('cartList', JSON.stringify(itemsInCart));
      subject.next('changed');
    } else {
      local_Storage = JSON.parse(localStorage.getItem('cartList'));
      for (var i in local_Storage) {
        if (this.items.id === local_Storage[i].id &&  this.items.infoID===local_Storage[i].infoID) {
          let count = parseInt(local_Storage[i]['number']);
          count = count + 1;
          this.items.number = count;
          let index = parseInt(i);
          local_Storage.splice(index, 1);
          localStorage.setItem('cartList', JSON.stringify(local_Storage));
          break;
        }
      }
    }
    if (this.items) {
      itemsInCart.push(this.items);
    }
    local_Storage.forEach(function(item) {
      itemsInCart.push(item);
    });
    localStorage.setItem('cartList', JSON.stringify(itemsInCart));
    subject.next('changed');


  }

  addToCart1(Product: any,count:number) {
    this.items = {
      id: Product.id,
      infoID:Product.infoID,
      name:Product.name,
      colorCode:Product.colorCode,
      image:Product.image,
      price:Product.price,
      discountCode:Product.discountCode,
      discountPercent:Product.discountPercent,
      sendCost:Product.sendCost
    };

    console.log(this.items)
    let local_Storage;
    let itemsInCart = [];

    if (localStorage.getItem('cartList') === null) {
      itemsInCart.push(this.items);
      localStorage.setItem('cartList', JSON.stringify(itemsInCart));
      subject.next('changed');
    } else {
      local_Storage = JSON.parse(localStorage.getItem('cartList'));
      for (var i in local_Storage) {
        if (this.items.id === local_Storage[i].id &&  this.items.infoID===local_Storage[i].infoID) {
          console.log('=')
          let countOld = parseInt(local_Storage[i].number);
          this.items.number = Number( count );
          let index = parseInt(i);
          local_Storage.splice(index, 1);
          localStorage.setItem('cartList', JSON.stringify(local_Storage));
          break;
        }
      }
    }
    if (this.items) {
      itemsInCart.push(this.items);
    }
    local_Storage.forEach(function(item) {
      itemsInCart.push(item);
    });
    localStorage.setItem('cartList', JSON.stringify(itemsInCart));
    subject.next('changed');
    // console.log(JSON.parse(localStorage.getItem('cartList')!));

  }
  deleteItem(item) {
    // console.log(item)
    let shopping_cart;
    let index;
    shopping_cart = JSON.parse(localStorage.getItem('cartList')!);
    for (let i in shopping_cart) {
      if (item.id === shopping_cart[i]._id) {
        index = i;
      }
    }
    shopping_cart.splice(index, 1);
    localStorage.setItem('cartList', JSON.stringify(shopping_cart));
  }

  getItems() {
    return this.items = JSON.parse(localStorage.getItem('cartList')!);

  }
}
