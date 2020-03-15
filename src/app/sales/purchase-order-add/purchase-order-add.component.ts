import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-purchase-order-add',
  templateUrl: './purchase-order-add.component.html',
  styleUrls: ['./purchase-order-add.component.css']
})
export class PurchaseOrderAddComponent implements OnInit {
  selectedProductList:Array<Product> =[];

  constructor() { }

  ngOnInit() {
  }

  public OnSelectProduct(product) {
    console.log(product);
    this.selectedProductList.push(product);
  }

}
