import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier/supplier.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { PcSetupBoardComponent } from './pc-setup-board/pc-setup-board.component';


@NgModule({
  declarations: [SupplierComponent, CategoryComponent, ProductComponent, PcSetupBoardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    
    MatCardModule
  ],
  exports:[
    SupplierComponent,
    CategoryComponent,
    ProductComponent
  ]
})
export class SetupModule { }
