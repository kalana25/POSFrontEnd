import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { Router,ActivatedRoute } from '@angular/router';
import { DropdownItem } from 'src/app/core/dropdown-item';
import { map} from 'rxjs/operators';
import { pipe } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../../models/category';
import { RouteStateService } from 'src/app/shared/services/route-state.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  prouctFormGroup:FormGroup;
  categoryList:Array<Category>;


  constructor(
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<ProductEditComponent>,
    private productService:ProductService,
    private categoryService:CategoryService
  ) { 

  }

  ngOnInit() {
    this.LoadCategories();
    this.initForm();
    this.setFormValues();
  }

  private initForm() {
    this.prouctFormGroup = this.fb.group({
      'id':['',Validators.required],
      'code':['',Validators.required],
      'name':['',Validators.required],
      'categoryId':['',Validators.required],
      'price':[''],
      'barcode':[''],
      'reOrderLevel':[''],
      'active':[true]
    });
  }

  private setFormValues() {
    this.prouctFormGroup.setValue({
      'id':this.data.id,
      'code':this.data.code,
      'name':this.data.name,
      'categoryId':this.data.categoryId,
      'price':this.data.price,
      'barcode':this.data.barcode,
      'reOrderLevel':this.data.reOrderLevel,
      'active':this.data.active
    })
  }

  private LoadCategories() {
    this.categoryService.get("findall")
    .subscribe(res=>{
      this.categoryList=res;
    },err=>{
      console.error(err);
    })
  }

  OnSubmit() {
    if(this.prouctFormGroup.valid) {
      this.UpdateProduct(this.prouctFormGroup.value);
    }
  }

  UpdateProduct(product:Product) {
    this.productService.update(product)
    .subscribe(_=>{
      this.dialogRef.close();
    },err=>{
      console.error(err);
    })
  }

}
