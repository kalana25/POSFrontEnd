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

  categoryList:Array<Category>;

  constructor(
    protected productService:ProductService,
    protected categoryService:CategoryService
  ) { }

  ngOnInit() {

    this.categoryService.get("findall")
    .subscribe(res=>{
      this.categoryList=res;
    },err=>{
      console.error(err);
    });
    
  }

}
