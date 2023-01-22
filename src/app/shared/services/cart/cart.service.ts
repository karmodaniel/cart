import { Injectable } from '@angular/core';

import { IProductCart } from '../../models/cart.interface';
import { IProduct } from '../../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: IProductCart[] = [];
  private cartTotal: number = 0;
  private subtotal: number = 0;

  constructor() {}

  containsProductInCart(id: number): boolean {
    return this.cartItems.some((item) => item.info.id === id);
  }

  addItem(item: IProduct): void {
    if (!this.containsProductInCart(item.id)) {
      this.cartItems.push({
        amount: 1,
        totalPrice: item.price,
        info: item,
      });
      console.log(this.cartItems);
      this.updateCartTotals();
      return;
    }

    const productIndex = this.findProductIndex(item.id);
    this.increaseProductAmount(productIndex);
    const cartProduct = this.getProduct(productIndex);
    this.updateProductTotalPrice(cartProduct, productIndex);

    console.log(this.cartItems);
    this.updateCartTotals();
  }

  increaseProductAmount(index: number, value: number = 1): void {
    this.cartItems[index].amount += value;
  }

  calculateItemTotalPrice(product: IProductCart): number {
    return product.amount * product.info.price;
  }

  findProductIndex(id: number): number {
    let productIndex = -1;
    this.cartItems.forEach((item, index) => {
      if (item.info.id === id) {
        console.log(item);
        productIndex = index;
        return;
      }
    });

    return productIndex;
  }

  getProduct(index: number): IProductCart {
    return this.cartItems[index];
  }

  updateProductTotalPrice(product: IProductCart, index: number): void {
    this.cartItems[index].totalPrice = this.calculateItemTotalPrice(product);
  }

  calculateCartTotal(): number {
    if (this.cartItems.length === 0) return 0;
    return this.cartItems
      .map((product) => product.totalPrice)
      .reduce((acc, cur) => acc + cur);
  }

  deleteItem(id: number): void {
    this.cartItems.forEach((product, index) => {
      if (product.info.id === id) {
        this.cartItems.splice(index, 1);
        this.updateCartTotals();
        return;
      }
    });
  }

  checkEmptyCart(): boolean {
    return !(this.cartItems.length > 0);
  }

  changeProductAmount(
    product: IProductCart,
    index: number,
    newAmount: number
  ): void {
    this.cartItems[index].amount = newAmount;
    this.updateProductTotalPrice(
      product,
      this.findProductIndex(product.info.id)
    );
    this.updateCartTotals();
  }

  productAmount(index: number): number {
    return this.cartItems[index].amount;
  }

  updateCartTotals(): void {
    this.cartTotal = this.calculateCartTotal();
    this.subtotal = this.cartTotal;
  }

  get cartSubtotal(): number {
    return this.subtotal;
  }

  get cartTotalPurchase(): number {
    return this.cartTotal;
  }

  get cart(): IProductCart[] {
    return this.cartItems;
  }
}
