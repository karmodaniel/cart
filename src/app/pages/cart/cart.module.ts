import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { MiniCartComponent } from './mini-cart/mini-cart.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CartComponent,
    MiniCartComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MiniCartComponent
  ]
})
export class CartModule { }
