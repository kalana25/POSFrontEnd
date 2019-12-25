import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierComponent } from './setup/supplier/supplier.component';
import { SupplierListComponent } from './setup/supplier/supplier-list/supplier-list.component';
import { SupplierAddEditComponent } from './setup/supplier/supplier-add-edit/supplier-add-edit.component';

import { CategoryComponent } from './setup/category/category.component';
import { CategoryAddEditComponent } from './setup/category/category-add-edit/category-add-edit.component';

import { ProductComponent } from './setup/product/product.component';
import { ProductAddEditComponent } from './setup/product/product-add-edit/product-add-edit.component';
import { PcSetupBoardComponent } from './setup/pc-setup-board/pc-setup-board.component';


const routes: Routes = [
  {path:'supplier',component:SupplierComponent},
  {path:'supplier-list',component:SupplierListComponent},
  {path:'supplier-new',component:SupplierAddEditComponent},
  
  {path:'category',component:CategoryComponent},
  {path:'category-new',component:CategoryAddEditComponent},
  
  {path:'product',component:ProductComponent},
  {path:'product-new',component:ProductAddEditComponent},
  {path:'product-config',component:PcSetupBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
