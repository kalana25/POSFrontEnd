import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { AngularMaterialModule } from './../angular-material.module';
import { PurchaseOrderAddComponent } from './components/purchase-order-add/purchase-order-add.component';
import { PurchaseOrderHeaderComponent } from './components/purchase-order-header/purchase-order-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SetupModule } from '../setup/setup.module';
import { PurchaseOrderDetailComponent } from './components/purchase-order-detail/purchase-order-detail.component';
import { PoDetailPickerComponent } from './components/po-detail-picker/po-detail-picker.component';



@NgModule({
  declarations: [
    PurchaseOrderComponent, 
    PurchaseOrderAddComponent, 
    PurchaseOrderHeaderComponent, 
    PurchaseOrderDetailComponent, 
    PoDetailPickerComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SetupModule
  ],
  exports: [
    PurchaseOrderComponent
  ],
  entryComponents:[PoDetailPickerComponent]
})
export class SalesModule { }
