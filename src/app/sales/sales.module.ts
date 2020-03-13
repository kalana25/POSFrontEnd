import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';



@NgModule({
  declarations: [PurchaseOrderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PurchaseOrderComponent
  ]
})
export class SalesModule { }
