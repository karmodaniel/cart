import { map, Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from './services/store.service';
import { IProduct } from './models/product.interface';

@Component({
  selector: 'store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  @ViewChild('sidenav') cart: any;
  
  public products$: Observable<IProduct[]> = new Observable<[]>();
  public cartItems: IProduct[] = [];
  emptyCart = true;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.products$ = this.storeService
      .getProducts()
      .pipe(map((products) => products));
  }

  openCart() {}

  addToCard(item: IProduct) {
    this.addItem(item);
    this.cart.open();
  }

  addItem(item: IProduct) {
    this.cartItems.push(item);
    console.log(this.cartItems);
  }

  deleteItem(id: number) {
    this.cartItems.forEach((item, index) => {
      if (item.id === id) {
        this.cartItems.splice(index, 1);
        return;
      }
    });
  }

  checkEmptyCart() {
    return !(this.cartItems.length > 0);
  }
}