import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { IProductCart } from '../../../shared/models/cart.interface';
import { CartService } from '../../../shared/services/cart/cart.service';
import { SidenavService } from '../../../shared/services/sidenav/sidenav.service';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss'],
})
export class MiniCartComponent implements OnInit {
  public productAmount: FormControl = new FormControl(1);
  public amountOfProducts = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(
    private cartService: CartService,
    private sidenavService: SidenavService
  ) {}

  ngOnInit(): void {}

  closeCart(): void {
    this.sidenavService.close();
  }

  cartEmpty(): boolean {
    return this.cartService.checkEmptyCart();
  }

  cartSubtotal(): number {
    return this.cartService.cartSubtotal;
  }

  cartTotal(): number {
    return this.cartService.cartSubtotal;
  }

  cartItems(): IProductCart[] {
    return this.cartService.cart;
  }

  deleteItem(id: number): void {
    this.cartService.deleteItem(id);
  }

  handleProductAmountChange(product: IProductCart, index: number, value: number): void {
      // this.cartItems[index].amount = this.productAmount.value;
      // this.updateProductTotalPrice(
      //   product,
      //   this.findProductIndex(product.info.id)
      // );
      // this.cartTotal = this.calculateCartTotal();
      // this.subtotal = this.cartTotal;

      this.cartService.changeProductAmount(product, index, value);
      this.productAmount.setValue(this.cartService.productAmount(index));
    }
}
