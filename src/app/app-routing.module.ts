import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

import { SupplierListComponent } from './setup/components/supplier/supplier-list/supplier-list.component';
import { SupplierAddEditComponent } from './setup/components/supplier/supplier-add-edit/supplier-add-edit.component';
import { SupplierEditComponent } from './setup/components/supplier/supplier-edit/supplier-edit.component';

import { CategoryListComponent } from './setup/components/category/category-list/category-list.component';
import { CategoryAddEditComponent } from './setup/components/category/category-add-edit/category-add-edit.component';

import { ProductListComponent } from './setup/components/product/product-list/product-list.component';
import { ProductAddEditComponent } from './setup/components/product/product-add-edit/product-add-edit.component';
import { PcSetupBoardComponent } from './setup/components/pc-setup-board/pc-setup-board.component';

import { PurchaseOrderListComponent } from './sales/components/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderListDetailComponent } from './sales/components/purchase-order-list-detail/purchase-order-list-detail.component';
import { PurchaseOrderAddComponent } from './sales/components/purchase-order-add/purchase-order-add.component';
import { PurchaseOrderEditComponent } from './sales/components/edit/purchase-order-edit/purchase-order-edit.component';

import { DiscountListComponent } from './setup/components/discount/discount-list/discount-list.component';
import { DiscountAddComponent } from './setup/components/discount/discount-add/discount-add.component';
import { DiscountEditComponent } from './setup/components/discount/discount-edit/discount-edit.component';

import { BaseUnitListComponent } from './setup/components/base-unit/base-unit-list/base-unit-list.component'
import { BaseUnitAddComponent } from './setup/components/base-unit/base-unit-add/base-unit-add.component'

import { MeasurementListComponent } from './setup/components/measurement/measurement-list/measurement-list.component'
import { MeasurementAddComponent } from './setup/components/measurement/measurement-add/measurement-add.component'
import { GrnListComponent } from './sales/components/grn/grn-list/grn-list.component';
import { GrnAddComponent } from './sales/components/grn/grn-add/grn-add.component';
import { GrnListDetailComponent } from './sales/components/grn/grn-list-detail/grn-list-detail.component';

import { InventoryListComponent } from './sales/components/inventory/inventory-list/inventory-list.component';
import { InventoryListDetailComponent } from './sales/components/inventory/inventory-list-detail/inventory-list-detail.component';

const routes: Routes = [
  {path:'login-user',component:LoginComponent},
  {path:'register-user',component:RegisterComponent},
  {path:'home-page',component:HomePageComponent,
    children:[
      {path:'supplier-list',component:SupplierListComponent},
      {path:'supplier-new',component:SupplierAddEditComponent},
      {path:'supplier-edit',component:SupplierEditComponent},

      {path:'category-list',component:CategoryListComponent},
      {path:'category-new',component:CategoryAddEditComponent},

      {path:'product-list',component:ProductListComponent},
      {path:'product-new',component:ProductAddEditComponent},
      {path:'product-config',component:PcSetupBoardComponent},

      {path:'discount-list',component:DiscountListComponent},
      {path:'discount-new',component:DiscountAddComponent},
      {path:'discount-edit',component:DiscountEditComponent},

      {path:'base-unit-list',component:BaseUnitListComponent},
      {path:'base-unit-new',component:BaseUnitAddComponent},

      {path:'measurement-list',component:MeasurementListComponent},
      {path:'measurement-new',component:MeasurementAddComponent},

      {path:'purchase-order-list',component:PurchaseOrderListComponent},
      {path:'po-list-details/:id',component:PurchaseOrderListDetailComponent},
      {path:'purchase-order-add',component:PurchaseOrderAddComponent},  
      {path:'purchase-order-edit/:id',component:PurchaseOrderEditComponent},

      {path:'grn-list',component:GrnListComponent},
      {path:'grn-list-details/:id',component:GrnListDetailComponent},
      {path:'grn-add',component:GrnAddComponent},

      {path:'inventory-list',component:InventoryListComponent},
      {path:'inventory-list-details/:id',component:InventoryListDetailComponent}
    ]
  },
  {path:'',redirectTo:'/login-user',pathMatch:'full'},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
