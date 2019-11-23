import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier/supplier.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';



@NgModule({
  declarations: [SupplierComponent, CategoryComponent, ProductComponent],
  imports: [
    CommonModule
  ]
})
export class SetupModule { }
