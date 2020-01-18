import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from 'src/app/models/category';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/dialog-data';
import { CategoryDeleteAction } from '../dialog-actions/confirmation-action';
import { DialogContentComponent } from 'src/app/shared/components/dialog-content/dialog-content.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categoryList:Array<Category>;
  IsLoading:boolean = false;

  constructor(
    public categoryService:CategoryService,
    private router:Router,
    private dialog:MatDialog) { }

    ngOnInit() {
      this.LoadCategoryList();
    }
  
    private LoadCategoryList() {
      this.IsLoading = true;
      const endPoint = "findall"
      this.categoryService.get(endPoint)
      .subscribe(res=>{
        this.IsLoading = false;
        this.categoryList = res;
      })
    }

    OnAddClick() {
      this.router.navigate(['/category-new'])
    }

    public OnDelete(id:number) {
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
        this.LoadCategoryList();
      })
    }

}
