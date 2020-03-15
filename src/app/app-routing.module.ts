import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierListComponent } from './setup/supplier/supplier-list/supplier-list.component';
import { SupplierAddEditComponent } from './setup/supplier/supplier-add-edit/supplier-add-edit.component';
import { SupplierEditComponent } from './setup/supplier/supplier-edit/supplier-edit.component';

import { CategoryListComponent } from './setup/category/category-list/category-list.component';
import { CategoryAddEditComponent } from './setup/category/category-add-edit/category-add-edit.component';

import { ProductListComponent } from './setup/product/product-list/product-list.component';
import { ProductAddEditComponent } from './setup/product/product-add-edit/product-add-edit.component';
import { PcSetupBoardComponent } from './setup/pc-setup-board/pc-setup-board.component';

import { PurchaseOrderComponent } from './sales/purchase-order/purchase-order.component';
import { PurchaseOrderAddComponent } from './sales/purchase-order-add/purchase-order-add.component';


import { from } from 'rxjs';


const routes: Routes = [
  {path:'supplier-list',component:SupplierListComponent},
  {path:'supplier-new',component:SupplierAddEditComponent},
  {path:'supplier-edit',component:SupplierEditComponent},
  
  {path:'category-list',component:CategoryListComponent},
  {path:'category-new',component:CategoryAddEditComponent},
  
  {path:'product-list',component:ProductListComponent},
  {path:'product-new',component:ProductAddEditComponent},
  {path:'product-config',component:PcSetupBoardComponent},

  {path:'purchase-orders',component:PurchaseOrderComponent},
  {path:'purchase-order-add',component:PurchaseOrderAddComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
