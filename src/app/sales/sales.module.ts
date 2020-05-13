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
import { BsActionMenuComponent } from './components/bs-action-menu/bs-action-menu.component';
import { PurchaseOrderListComponent } from './components/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderListDetailComponent } from './components/purchase-order-list-detail/purchase-order-list-detail.component';
import { PurchaseOrderEditHeaderComponent } from './components/purchase-order-edit-header/purchase-order-edit-header.component';
import { PurchaseOrderEditDetailComponent } from './components/purchase-order-edit-detail/purchase-order-edit-detail.component';


@NgModule({
  declarations: [
    PurchaseOrderAddComponent, 
    PurchaseOrderHeaderComponent, 
    PurchaseOrderDetailComponent, 
    PoDetailPickerComponent, 
    BsActionMenuComponent, 
    PurchaseOrderListComponent, 
    PurchaseOrderListDetailComponent, 
    PurchaseOrderEditHeaderComponent, 
    PurchaseOrderEditDetailComponent
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
    BsActionMenuComponent
  ]
})
export class SalesModule { }
