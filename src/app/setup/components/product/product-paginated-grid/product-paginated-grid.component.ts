import { Component, Input, OnChanges, OnInit, EventEmitter, Output } from '@angular/core';
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
  @Output() selectedProd = new EventEmitter<Product>();

  constructor(
    protected productService:ProductService,
    protected toasterService:ToastrService
  ) { }

  ngOnInit() {
  }
  
  ngOnChanges() {
    if(this.category) {
      this.getProductByCategory(this.category.id)
    }
  }



  private getProductByCategory(categoryId:number) {
    this.productService.get(`findall/categoryId/${categoryId}`)
    .subscribe(resp=>{
      this.productList = resp;
    },err=>{
      this.toasterService.error("Please check the internet connection","Something Bad happen")
      console.error(err);
    })
  }
  // findall/categoryId/{categoryId}

  public OnSelectProduct(input:Product) {
    this.selectedProd.emit(input);
  }

}
