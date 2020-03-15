import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { AngularMaterialModule } from './../angular-material.module';
import { PurchaseOrderAddComponent } from './purchase-order-add/purchase-order-add.component';
import { PurchaseOrderHeaderComponent } from './purchase-order-header/purchase-order-header.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PurchaseOrderComponent, PurchaseOrderAddComponent, PurchaseOrderHeaderComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    PurchaseOrderComponent
  ]
})
export class SalesModule { }
