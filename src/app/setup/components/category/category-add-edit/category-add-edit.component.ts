import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { Router,ActivatedRoute } from '@angular/router';
import { DropdownItem } from 'src/app/core/dropdown-item';
import { map} from 'rxjs/operators';
import { RouteStateService } from 'src/app/shared/services/route-state.service';
import { pipe, from } from 'rxjs';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.css']
})
export class CategoryAddEditComponent implements OnInit {

  public pcsetupScreenActive:boolean = true;
  public categoryFormGroup:FormGroup;
  public parentCategoryList:Array<DropdownItem>;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    public routeStateService:RouteStateService,
    private categoryService:CategoryService,
    private toasterService:ToastrService
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
        this.getCategories();
        this.initFormForNewCategory();
      }
      this.getNextCategoryCode();
    });
  }


  private initFormForNewCategory() {
    this.categoryFormGroup = this.fb.group({
      'Code':['',Validators.required],
      'Name':['',Validators.required],
      'Description':[''],
      'ParentCategoryId':['',Validators.required],
      'Level':[''],
      'Active':[true]
    });
  }

  private initFormForPCSetup() {
    let parentCategoryId=null;
    let parentCategory=null;
    const data = JSON.parse(localStorage.getItem("ABC"));
    if(data.currentLevel===1) {
      parentCategoryId=0;
      parentCategory="No parent";
    } else {
      const category = data.parentCategory as Category;
      parentCategoryId=category.id;
      parentCategory=category.name;
    }
    
    this.categoryFormGroup = this.fb.group({
      'Code':['',Validators.required],
      'Name':['',Validators.required],
      'Description':[''],
      'ParentCategoryId':[parentCategoryId,Validators.required],
      'ParentCategoryName':[{value:parentCategory,disabled:true}],
      'Level':[data.currentLevel],
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
      if(this.routeStateService.getPreviousUrl()==="/home-page/category-list") {
        this.router.navigate(['../category-list'],{relativeTo:this.activatedRoute});
      } else {
        this.router.navigate(['../product-config'],{relativeTo:this.activatedRoute});
      }
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

  private getNextCategoryCode() {
    this.categoryService.getNextCategoryCode()
    .subscribe(res=>{
      if(res.code) {
        this.categoryFormGroup.get('Code').patchValue(res.code);
      }
    },err=>{
      this.toasterService.error("Please check the internet connection","Something Bad happen")
      console.error(err);
    })
  }

}
