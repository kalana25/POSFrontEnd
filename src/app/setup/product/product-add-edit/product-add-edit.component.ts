import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { DropdownItem } from 'src/app/core/dropdown-item';
import { map} from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryAddEditComponent } from '../../category/category-add-edit/category-add-edit.component';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent implements OnInit {

  prouctFormGroup:FormGroup;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private productService:ProductService
  ) { 

  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    const data = JSON.parse(localStorage.getItem("ABC"));
    const category = data.parentCategory as Category;
    this.prouctFormGroup = this.fb.group({
      'Code':['',Validators.required],
      'Name':['',Validators.required],
      'CategoryName':[{value:category.name,disabled:true}],
      'CategoryId':[category.id,Validators.required],
      'Price':[''],
      'Barcode':[''],
      'Active':[true]
    });
  }

  SaveProduct(product:Product) {
    this.productService.add(product)
    .subscribe(res=>{
      this.router.navigate(['/product-config']);
    },err=>{
      console.error(err);
    })
  }

  OnSubmit() {
    if(this.prouctFormGroup.valid) {
      this.SaveProduct(this.prouctFormGroup.value);
    }
  }

}
