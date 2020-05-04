import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from 'src/app/models/category';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/dialog-data';
import { CategoryDeleteAction } from '../dialog-actions/confirmation-action';
import { DialogContentComponent } from 'src/app/shared/components/dialog-content/dialog-content.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { ResponseData } from 'src/app/core/response-data';
import { RequestData } from 'src/app/core/request-data';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categoryResponse:ResponseData<Category>;
  categoryRequest:RequestData;
  IsLoading:boolean = false;

  displayedColumns: string[] = ['code', 'name', 'description','action'];

  constructor(
    public categoryService:CategoryService,
    private router:Router,
    private dialog:MatDialog) { }

    ngOnInit() {
      this.categoryRequest = new RequestData();
      this.categoryRequest.page=1;
      this.categoryRequest.pageSize=5;
      this.getCategoryPagination(this.categoryRequest);
    }

    private getCategoryPagination(categoryRequest:RequestData) {
      this.IsLoading = true;
      this.categoryService.pagination(categoryRequest)
      .subscribe(res=>{
        this.categoryResponse = res;
        this.IsLoading = false;
        console.log(res);
      },err=>{
        this.IsLoading = false;
        console.error(err);
      })
    }

    public OnPage(event:PageEvent):void {
      this.categoryRequest.pageSize = event.pageSize;
      this.categoryRequest.page= event.pageIndex+1;
      this.getCategoryPagination(this.categoryRequest);
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
          height: '200px',
          data:confrimData
        });
      dialogRef.afterClosed().subscribe(res=>{
        this.getCategoryPagination(this.categoryRequest);
      })
    }

    public OnEdit(category:Category) {
      let dialogRef = this.dialog.open(CategoryEditComponent,
        {
          data:category
        });
      dialogRef.afterClosed().subscribe(_=>{
        this.getCategoryPagination(this.categoryRequest)
      });
    }

}
