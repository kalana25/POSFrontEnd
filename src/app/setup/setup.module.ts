import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//import {MatRippleModule} from '@angular/material/core';
import { PcSetupBoardComponent } from './pc-setup-board/pc-setup-board.component';
import { SupplierListComponent } from './components/supplier/supplier-list/supplier-list.component';
import { SupplierAddEditComponent } from './components/supplier/supplier-add-edit/supplier-add-edit.component';
import { BsActionMenuComponent } from './pc-setup-board/bs-action-menu/bs-action-menu.component';
import { CategoryAddEditComponent } from './components/category/category-add-edit/category-add-edit.component';
import { ProductAddEditComponent } from './product/product-add-edit/product-add-edit.component';
import { SupplierDeleteDialogComponent } from './components/supplier/supplier-delete-dialog/supplier-delete-dialog.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { SupplierEditComponent } from './components/supplier/supplier-edit/supplier-edit.component';
import { CategoryEditComponent } from './components/category/category-edit/category-edit.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [
    ProductListComponent,
    SupplierListComponent,
    CategoryListComponent,
    PcSetupBoardComponent,
    SupplierAddEditComponent,
    BsActionMenuComponent,
    CategoryAddEditComponent,
    ProductAddEditComponent,
    SupplierDeleteDialogComponent,
    SupplierEditComponent,
    CategoryEditComponent,
    ProductEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  exports:[
    SupplierListComponent,
    CategoryListComponent,
    ProductListComponent,
    PcSetupBoardComponent
  ],
  entryComponents:[
    BsActionMenuComponent,
    SupplierDeleteDialogComponent,
    CategoryEditComponent,
    ProductEditComponent
  ]
})
export class SetupModule { }
