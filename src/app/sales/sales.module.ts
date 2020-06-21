import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './../angular-material.module';
import { PurchaseOrderAddComponent } from './components/purchase-order-add/purchase-order-add.component';
import { PurchaseOrderHeaderComponent } from './components/purchase-order-header/purchase-order-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SetupModule } from '../setup/setup.module';
import { PurchaseOrderDetailComponent } from './components/purchase-order-detail/purchase-order-detail.component';
import { PoDetailPickerComponent } from './components/po-detail-picker/po-detail-picker.component';
import { SharedModule } from '../shared/shared.module';
import { PurchaseOrderListComponent } from './components/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderListDetailComponent } from './components/purchase-order-list-detail/purchase-order-list-detail.component';
import { PurchaseOrderEditComponent } from './components/edit/purchase-order-edit/purchase-order-edit.component';
import { PurchaseOrderEditItemComponent } from './components/edit/purchase-order-edit-item/purchase-order-edit-item.component';
import { GrnListComponent } from './components/grn/grn-list/grn-list.component';
import { GrnAddComponent } from './components/grn/grn-add/grn-add.component';
import { GrnFormComponent } from './components/grn/grn-form/grn-form.component';
import { PoPickerComponent } from './components/po-picker/po-picker.component';

@NgModule({
  declarations: [
    PurchaseOrderAddComponent, 
    PurchaseOrderHeaderComponent, 
    PurchaseOrderDetailComponent, 
    PoDetailPickerComponent, 
    PurchaseOrderListComponent, 
    PurchaseOrderListDetailComponent, 
    PurchaseOrderEditComponent, 
    PurchaseOrderEditItemComponent, 
    GrnListComponent, 
    GrnAddComponent, GrnFormComponent, PoPickerComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SetupModule,
    SharedModule
  ],
  exports: [
    PurchaseOrderListComponent,
    PurchaseOrderListDetailComponent,
  ],
  entryComponents:[
    PoDetailPickerComponent,
    PurchaseOrderEditItemComponent
  ]
})
export class SalesModule { }
