import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { AngularMaterialModule } from './../angular-material.module';
import { PurchaseOrderAddComponent } from './purchase-order-add/purchase-order-add.component';



@NgModule({
  declarations: [PurchaseOrderComponent, PurchaseOrderAddComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    PurchaseOrderComponent
  ]
})
export class SalesModule { }
