import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier/supplier.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
//import {MatRippleModule} from '@angular/material/core';
import { PcSetupBoardComponent } from './pc-setup-board/pc-setup-board.component';
import { SupplierListComponent } from './supplier/supplier-list/supplier-list.component';
import { SupplierAddEditComponent } from './supplier/supplier-add-edit/supplier-add-edit.component';


@NgModule({
  declarations: [SupplierComponent, CategoryComponent, ProductComponent, PcSetupBoardComponent, SupplierListComponent, SupplierAddEditComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    //MatRippleModule
  ],
  exports:[
    SupplierComponent,
    CategoryComponent,
    ProductComponent
  ]
})
export class SetupModule { }
