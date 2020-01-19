import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Router,ActivatedRoute } from '@angular/router';
import { DropdownItem } from 'src/app/core/dropdown-item';
import { map} from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError} from '@angular/material/dialog';
import { RouteStateService } from 'src/app/shared/services/route-state.service';
import { pipe, from } from 'rxjs';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  public categoryFormGroup:FormGroup;
  public parentCategoryList:Array<DropdownItem>;

  constructor(
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<CategoryEditComponent>,
    public routeStateService:RouteStateService,
    private categoryService:CategoryService
  ) { 

  }

  ngOnInit() {
    this.getCategories();
    this.initForm();
    this.setFormValues();
  }

  private initForm() {
    this.categoryFormGroup = this.fb.group({
      'id':['',Validators.required],
      'code':['',Validators.required],
      'name':['',Validators.required],
      'description':[''],
      'parentCategoryId':['',Validators.required],
      'level':[''],
      'active':['']
    });
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

  private setFormValues() {
    this.categoryFormGroup.setValue({
      'id':this.data.id,
      'code':this.data.code,
      'name':this.data.name,
      'description':this.data.description,
      'parentCategoryId':this.data.parentCategoryId,
      'level':this.data.level,
      'active':this.data.active
    });
  }

  OnSubmit() {
    if(this.categoryFormGroup.valid) {
      this.UpdateCategory(this.categoryFormGroup.value);
    }
  }

  UpdateCategory(category:Category) {
    this.categoryService.update(category)
    .subscribe(res=>{
      this.dialogRef.close();
    },err=>{
      console.error(err);
    })
  }

}
