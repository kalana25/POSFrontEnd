import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierListComponent } from './setup/components/supplier/supplier-list/supplier-list.component';
import { SupplierAddEditComponent } from './setup/components/supplier/supplier-add-edit/supplier-add-edit.component';
import { SupplierEditComponent } from './setup/components/supplier/supplier-edit/supplier-edit.component';

import { CategoryListComponent } from './setup/components/category/category-list/category-list.component';
import { CategoryAddEditComponent } from './setup/components/category/category-add-edit/category-add-edit.component';

import { ProductListComponent } from './setup/components/product/product-list/product-list.component';
import { ProductAddEditComponent } from './setup/components/product/product-add-edit/product-add-edit.component';
import { PcSetupBoardComponent } from './setup/components/pc-setup-board/pc-setup-board.component';

import { PurchaseOrderListComponent } from './sales/components/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderAddComponent } from './sales/components/purchase-order-add/purchase-order-add.component';


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

  {path:'purchase-order-list',component:PurchaseOrderListComponent},
  {path:'purchase-order-add',component:PurchaseOrderAddComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
