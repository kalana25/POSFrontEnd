import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { subscribeOn } from 'rxjs/operators';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-pc-setup-board',
  templateUrl: './pc-setup-board.component.html',
  styleUrls: ['./pc-setup-board.component.css']
})
export class PcSetupBoardComponent implements OnInit {

  CurrentLevel:number = 1;
  categoryList:Array<Category>;
  selectionStack:Array<Category>=[];

  constructor(
    protected productService:ProductService,
    protected categoryService:CategoryService
  ) { }

  ngOnInit() {

    this.categoryService.get(`findall/level/${this.CurrentLevel}`)
    .subscribe(res=>{
      this.categoryList=res;
    },err=>{
      console.error(err);
    });
    
  }

  OnCategoryClick(category:Category) {
    this.categoryList.push(category);
    this.CurrentLevel +=1;
    this.categoryService.get(`findall/parent/${category.id}/level/${this.CurrentLevel}`)
    .subscribe(res=>{
      this.categoryList = res;
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

}
