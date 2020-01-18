import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList:Array<Product>;
  IsLoading:boolean = false;

  constructor(
    public productService:ProductService,
    private router:Router,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.LoadProductList();
  }

  private LoadProductList() {
    this.IsLoading = true;
    const endPoint = "findall"
    this.productService.get(endPoint)
    .subscribe(res=>{
      this.IsLoading = false;
      this.productList = res;
    })
  }

  OnAddClick() {
    this.router.navigate(['/product-new'])
  }


}
