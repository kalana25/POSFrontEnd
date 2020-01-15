import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier/supplier.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

//import {MatRippleModule} from '@angular/material/core';
import { PcSetupBoardComponent } from './pc-setup-board/pc-setup-board.component';
import { SupplierListComponent } from './supplier/supplier-list/supplier-list.component';
import { SupplierAddEditComponent } from './supplier/supplier-add-edit/supplier-add-edit.component';
import { BsActionMenuComponent } from './pc-setup-board/bs-action-menu/bs-action-menu.component';
import { CategoryAddEditComponent } from './category/category-add-edit/category-add-edit.component';
import { ProductAddEditComponent } from './product/product-add-edit/product-add-edit.component';
import { SupplierDeleteDialogComponent } from './supplier/supplier-delete-dialog/supplier-delete-dialog.component';


@NgModule({
  declarations: [
    SupplierComponent, 
    CategoryComponent, 
    ProductComponent, 
    PcSetupBoardComponent, 
    SupplierListComponent, 
    SupplierAddEditComponent, 
    BsActionMenuComponent, CategoryAddEditComponent, ProductAddEditComponent, SupplierDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatProgressSpinnerModule
    //MatRippleModule
  ],
  exports:[
    SupplierComponent,
    CategoryComponent,
    ProductComponent
  ],
  entryComponents:[BsActionMenuComponent,SupplierDeleteDialogComponent]
})
export class SetupModule { }
