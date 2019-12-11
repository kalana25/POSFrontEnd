import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierComponent } from './setup/supplier/supplier.component';
import { CategoryComponent } from './setup/category/category.component';
import { ProductComponent } from './setup/product/product.component';
import { PcSetupBoardComponent } from './setup/pc-setup-board/pc-setup-board.component';


const routes: Routes = [
  {path:'supplier',component:SupplierComponent},
  {path:'category',component:CategoryComponent},
  {path:'product',component:ProductComponent},
  {path:'product-config',component:PcSetupBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
