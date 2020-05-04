import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { PurchaseOrderDetail } from '../../models/purchase-order-detail';
import { fadeInItems } from '@angular/material';

@Component({
  selector: 'app-purchase-order-detail',
  templateUrl: './purchase-order-detail.component.html',
  styleUrls: ['./purchase-order-detail.component.css']
})
export class PurchaseOrderDetailComponent implements OnInit {

  private products:Array<{product:Product,details:PurchaseOrderDetail}>
  @Output() delete = new EventEmitter<{product:Product,details:PurchaseOrderDetail}>();
  
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

  OnDeleteItem(item:{product:Product,details:PurchaseOrderDetail}) {
    if(item.details.quantity>1) {
      item.details.quantity -=1;
    } else if(item.details.quantity==1) {
      let index = this.products.findIndex(x=>x.product.id==item.product.id);
      if(index!=-1) {
        this.products.splice(index,1);
      }
    }
    this.delete.emit(item);
  }

}
