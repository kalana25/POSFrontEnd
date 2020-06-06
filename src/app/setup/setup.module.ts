import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CommonModule } from '@angular/common';
//import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//import {MatRippleModule} from '@angular/material/core';
import { PcSetupBoardComponent } from './components/pc-setup-board/pc-setup-board.component';
import { SupplierListComponent } from './components/supplier/supplier-list/supplier-list.component';
import { SupplierAddEditComponent } from './components/supplier/supplier-add-edit/supplier-add-edit.component';
import { BsActionMenuComponent } from './components/pc-setup-board/bs-action-menu/bs-action-menu.component';
import { CategoryAddEditComponent } from './components/category/category-add-edit/category-add-edit.component';
import { ProductAddEditComponent } from './components/product/product-add-edit/product-add-edit.component';
import { SupplierDeleteDialogComponent } from './components/supplier/supplier-delete-dialog/supplier-delete-dialog.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { SupplierEditComponent } from './components/supplier/supplier-edit/supplier-edit.component';
import { CategoryEditComponent } from './components/category/category-edit/category-edit.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { AngularMaterialModule } from '../angular-material.module';
import { DiscountListComponent } from './components/discount/discount-list/discount-list.component';
import { DiscountAddComponent } from './components/discount/discount-add/discount-add.component';
import { DiscountEditComponent } from './components/discount/discount-edit/discount-edit.component';
import { BaseUnitListComponent } from './components/base-unit/base-unit-list/base-unit-list.component';
import { BaseUnitAddComponent } from './components/base-unit/base-unit-add/base-unit-add.component';
import { BaseUnitEditComponent } from './components/base-unit/base-unit-edit/base-unit-edit.component';
import { MeasurementListComponent } from './components/measurement/measurement-list/measurement-list.component';
import { MeasurementAddComponent } from './components/measurement/measurement-add/measurement-add.component';
import { MeasurementEditComponent } from './components/measurement/measurement-edit/measurement-edit.component';


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
    DiscountListComponent,
    DiscountAddComponent,
    DiscountEditComponent,
    BaseUnitListComponent,
    BaseUnitAddComponent,
    BaseUnitEditComponent,
    MeasurementListComponent,
    MeasurementAddComponent,
    MeasurementEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    //HttpClientModule,
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
    ProductEditComponent,
    BaseUnitEditComponent,
  ]
})
export class SetupModule { }
