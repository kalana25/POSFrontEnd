import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/setup/models/category';
import { Product } from 'src/app/setup/models/product';
import { ProductService } from 'src/app/setup/services/product.service';

@Component({
  selector: 'app-product-paginated-grid',
  templateUrl: './product-paginated-grid.component.html',
  styleUrls: ['./product-paginated-grid.component.css']
})
export class ProductPaginatedGridComponent implements OnInit,OnChanges {
  productList:Array<Product>;
  @Input() category:Category;

  constructor(
    protected productService:ProductService,
    protected toasterService:ToastrService
  ) { }

  ngOnInit() {
  }
  
  ngOnChanges() {
    debugger;
    if(this.category) {
      this.getProductByCategory(this.category.id)
    }
  }



  private getProductByCategory(categoryId:number) {
    this.productService.get(`findall/categoryId/${categoryId}`)
    .subscribe(resp=>{
      this.productList = resp;
    },err=>{

    })
  }
  // findall/categoryId/{categoryId}

}
