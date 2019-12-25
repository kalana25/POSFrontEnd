import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { DropdownItem } from 'src/app/core/dropdown-item';
import { map} from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.css']
})
export class CategoryAddEditComponent implements OnInit {

  public categoryFormGroup:FormGroup;
  public parentCategoryList:Array<DropdownItem>;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private categoryService:CategoryService
  ) { 

  }

  ngOnInit() {
    this.getCategories();
    this.initForm();
  }

  private initForm() {
    this.categoryFormGroup = this.fb.group({
      'Code':['',Validators.required],
      'Name':['',Validators.required],
      'Description':[''],
      'ParentCategoryId':[''],
      'Level':[''],
      'Active':[true]
    });
  }

  OnSubmit() {
    if(this.categoryFormGroup.valid) {
      this.SaveCategory(this.categoryFormGroup.value);
    }
  }

  SaveCategory(category:Category) {
    this.categoryService.add(category)
    .subscribe(res=>{
      this.router.navigate(['/product-config']);
    },err=>{
      console.error(err);
    })
  }

  getCategories() {
    this.categoryService.get('findall')
    .pipe(map(array=>array.map(elem=>{
      return new DropdownItem(elem.id,elem.name);
    })))
    .subscribe(res=>{
      this.parentCategoryList = res;
      this.parentCategoryList.splice(0,0,new DropdownItem(0,'No Parent'));
    },err=>{
      console.log(err);
    });
  }

}
