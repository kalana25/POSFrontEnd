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
import { CategoryDeleteAction } from '../category/dialog-actions/confirmation-action';
import { ProductDeleteAction } from '../product/dialog-action/confirmation-action';
import { ToolBarService } from '../../shared/services/toolbar.service';
import { ProductEditComponent } from '../product/product-edit/product-edit.component';
import { CategoryEditComponent } from '../category/category-edit/category-edit.component';
@Component({
  selector: 'app-pc-setup-board',
  templateUrl: './pc-setup-board.component.html',
  styleUrls: ['./pc-setup-board.component.css']
})
export class PcSetupBoardComponent implements OnInit {

  BackButtonVisible:boolean = false;
  IsLoading:boolean = false;

  CurrentLevel:number = 1;
  categoryList:Array<Category>;
  selectionStack:Array<Category>=[];

  productList:Array<Product>;

  constructor(
    protected productService:ProductService,
    protected categoryService:CategoryService,
    protected toolbarService:ToolBarService,
    protected bottomSheet:MatBottomSheet,
    protected dialog:MatDialog
  ) { }

  ngOnInit() {
    this.IsLoading = true;
    forkJoin(
      this.categoryService.get(`findall/level/${this.CurrentLevel}`),
      this.productService.get(`findall/categoryId/0`)
    )
    .subscribe(([cat,pro])=>{
      this.IsLoading =false;
      this.categoryList=cat;
      this.productList=pro;
    },err=>{
      console.error(err);
    })
    
  }


  OnCategoryClick(category:Category) {
    this.IsLoading = true;
    this.selectionStack.push(category);
    this.CurrentLevel +=1;
    this.BackButtonVisible= true;
    forkJoin(
      this.categoryService.get(`findall/parent/${category.id}/level/${this.CurrentLevel}`),
      this.productService.get(`findall/categoryId/${category.id}`)
    )
    .subscribe(([cat,pro])=>{
      this.IsLoading = false; 
      this.categoryList = cat;
      this.productList = pro;
    },err=>{
      console.error(err);
    })
  }

  GoBackByOneLevel() {
    this.IsLoading = true;
    const category:Category = this.selectionStack.pop();
    if(this.CurrentLevel>1) {
      this.CurrentLevel -=1;
      this.BackButtonVisible = (this.CurrentLevel===1) ? false : true;
    }
    else
      return;
    forkJoin(
      this.categoryService.get(`findall/parent/${category.parentCategoryId}/level/${this.CurrentLevel}`),
      this.productService.get(`findall/categoryId/${category.parentCategoryId}`)
    )
    .subscribe(([cat,pro])=>{
      this.IsLoading = false;
      this.categoryList = cat;
      this.productList = pro;
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
    confrimData.dialogTitle = "Category Delete";
    confrimData.dialogContent = "Are you sure you want to delete this cateogry ?";
    confrimData.action = new CategoryDeleteAction(this.categoryService,id);
    
    let dialogRef = this.dialog.open(DialogContentComponent,
      {
        width:'500px',
        height: '180px',
        data:confrimData
      });
    dialogRef.afterClosed().subscribe(res=>{
      this.ReloadCurrentLevelCategories();
    })
  }

  OnDeleteProduct(id:number) {
    let confrimData = new DialogData()
    confrimData.buttonCancel = true;
    confrimData.buttonConfim = true;
    confrimData.dialogTitle = "Product Delete";
    confrimData.dialogContent = "Are you sure you want to delete this product ?";
    confrimData.action = new ProductDeleteAction(this.productService,id);

    let dialogRef = this.dialog.open(DialogContentComponent,
      {
        width:'500px',
        height: '180px',
        data:confrimData
      });
    dialogRef.afterClosed().subscribe(res=>{
      this.ReloadCurrentLevelProducts();
    })
  }

  ReloadCurrentLevelCategories() {
    this.IsLoading = true;
    this.categoryService.get(`findall/level/${this.CurrentLevel}`)
    .subscribe(res=>{
      this.IsLoading = false;
      this.categoryList = res;
    },err=>{
      console.error(err);
    })
  }

  ReloadCurrentLevelProducts() {
    this.IsLoading = true;
    const stackLength = this.selectionStack.length;
    const parentCategory = this.selectionStack[stackLength-1];
    this.productService.get(`findall/categoryId/${parentCategory.id}`)
    .subscribe(res=>{
      this.IsLoading = false;
      this.productList = res;
    },err=>{
      console.log(err);
    })
  }

  public OnEditProduct(product:Product) {
    let dialogRef = this.dialog.open(ProductEditComponent,
      {
        data:product
      });
    dialogRef.afterClosed().subscribe(_=>{
      this.ReloadCurrentLevelProducts();
    });
  }

  public OnEditCategory(category:Category) {
    let dialogRef = this.dialog.open(CategoryEditComponent,
      {
        data:category
      });
    dialogRef.afterClosed().subscribe(_=>{
      this.ReloadCurrentLevelCategories();
    });
  }

}
