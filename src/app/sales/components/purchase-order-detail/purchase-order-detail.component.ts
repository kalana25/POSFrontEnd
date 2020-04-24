import { Component, OnInit,Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { PurchaseOrderDetail } from '../../models/purchase-order-detail';

@Component({
  selector: 'app-purchase-order-detail',
  templateUrl: './purchase-order-detail.component.html',
  styleUrls: ['./purchase-order-detail.component.css']
})
export class PurchaseOrderDetailComponent implements OnInit {

  private products:Array<{product:Product,details:PurchaseOrderDetail}>
  
  @Input()
  set ProductList(value:Array<{product:Product,details:PurchaseOrderDetail}>) {
    this.products = value;
  }

  get ProductList():Array<{product:Product,details:PurchaseOrderDetail}> {
    return this.products;
  }
  
  constructor() { }

  ngOnInit() {
  }

}
