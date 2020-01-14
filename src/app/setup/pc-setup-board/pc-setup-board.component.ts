import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { forkJoin } from 'rxjs';
import { Category } from 'src/app/models/category';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { BsActionMenuComponent } from './bs-action-menu/bs-action-menu.component';
import { DropdownItem } from 'src/app/core/dropdown-item';
import { Product } from 'src/app/models/product';
import { DialogData } from 'src/app/core/dialog-data';
import { DialogContentComponent } from 'src/app/shared/components/dialog-content/dialog-content.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pc-setup-board',
  templateUrl: './pc-setup-board.component.html',
  styleUrls: ['./pc-setup-board.component.css']
})
export class PcSetupBoardComponent implements OnInit {

  CurrentLevel:number = 1;
  categoryList:Array<Category>;
  selectionStack:Array<Category>=[];

  productList:Array<Product>;

  constructor(
    protected productService:ProductService,
    protected categoryService:CategoryService,
    protected bottomSheet:MatBottomSheet,
    protected dialog:MatDialog
  ) { }

  ngOnInit() {

    forkJoin(
      this.categoryService.get(`findall/level/${this.CurrentLevel}`),
      this.productService.get(`findall/categoryId/0`)
    )
    .subscribe(([cat,pro])=>{
      this.categoryList=cat;
      this.productList=pro;
    },err=>{
      console.error(err);
    })
    
  }

  OnCategoryClick(category:Category) {
    this.selectionStack.push(category);
    this.CurrentLevel +=1;
    forkJoin(
      this.categoryService.get(`findall/parent/${category.id}/level/${this.CurrentLevel}`),
      this.productService.get(`findall/categoryId/${category.id}`)
    )
    .subscribe(([cat,pro])=>{
      this.categoryList = cat;
      this.productList = pro;
    },err=>{
      console.error(err);
    })
  }

  GoBackByOneLevel() {
    const category:Category = this.selectionStack.pop();
    this.CurrentLevel -=1;
    this.categoryService.get(`findall/parent/${category.parentCategoryId}/level/${this.CurrentLevel}`)
    .subscribe(res=>{
      this.categoryList = res;
    },err=>{
      console.error(err);
    })
  }

  OnAddNewClick() {
    const length = this.selectionStack.length;
    const lastCategory = this.selectionStack[length-1];
    const bottomSheetRef = this.bottomSheet.open(BsActionMenuComponent,{data:{currentLevel:this.CurrentLevel,parentCategory:lastCategory}});

  }

  public OnDeleteCategory(id:number) {
    let confrimData = new DialogData()
    confrimData.buttonCancel = true;
    confrimData.buttonConfim = true;
    confrimData.dialogContent = "Category Delete";
    confrimData.dialogTitle = "Are you sure you want to delete this cateogry ?";
    let dialogRef = this.dialog.open(DialogContentComponent,
      {
        width:'500px',
        height: '180px',
        data:confrimData
      });
    dialogRef.afterClosed().subscribe(res=>{
      console.log('After close ');
    })
  }

}
