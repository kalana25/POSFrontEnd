import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from 'src/app/models/category';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

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

}
