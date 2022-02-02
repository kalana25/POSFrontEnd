import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/setup/models/product';
import { ProductService } from 'src/app/setup/services/product.service';

@Component({
  selector: 'app-product-paginated-grid',
  templateUrl: './product-paginated-grid.component.html',
  styleUrls: ['./product-paginated-grid.component.css']
})
export class ProductPaginatedGridComponent implements OnInit {
  productList:Array<Product>;

  constructor(
    protected productService:ProductService,
    protected toasterService:ToastrService
  ) { }

  ngOnInit() {
    this.getProductByCategory(1)
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
