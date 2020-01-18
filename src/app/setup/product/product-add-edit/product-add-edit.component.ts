import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Router,ActivatedRoute } from '@angular/router';
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

  pcsetupScreenActive:boolean = true;
  prouctFormGroup:FormGroup;
  categoryList:Array<Category>;


  constructor(
    private fb:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private productService:ProductService,
    private categoryService:CategoryService
  ) { 

  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(map(()=>window.history.state))
    .subscribe(res=>{
      if(res.source==="From-PC-Setup") {
        this.pcsetupScreenActive = true;
        this.initFormForPCSetup();
      } else {
        this.pcsetupScreenActive = false;
        this.LoadCategories();
        this.initFormForNewProduct();
      }
    });
  }

  private initFormForNewProduct() {
    this.prouctFormGroup = this.fb.group({
      'Code':['',Validators.required],
      'Name':['',Validators.required],
      'CategoryId':['',Validators.required],
      'Price':[''],
      'Barcode':[''],
      'Active':[true]
    });
  }

  private initFormForPCSetup() {
    let categoryName=null;
    let categoryId=null;
    const data = JSON.parse(localStorage.getItem("ABC"));
    if(data.currentLevel===1) {
      categoryName='No category';
      categoryId = '0';
    } else {
      const category = data.parentCategory as Category;
      categoryId =category.id;
      categoryName = category.name;
    }
    this.prouctFormGroup = this.fb.group({
      'Code':['',Validators.required],
      'Name':['',Validators.required],
      'CategoryName':[{value:categoryName,disabled:true}],
      'CategoryId':[categoryId,Validators.required],
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

  LoadCategories() {
    this.categoryService.get("findall")
    .subscribe(res=>{
      this.categoryList=res;
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