import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { AngularMaterialModule } from './../angular-material.module';



@NgModule({
  declarations: [PurchaseOrderComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    PurchaseOrderComponent
  ]
})
export class SalesModule { }
