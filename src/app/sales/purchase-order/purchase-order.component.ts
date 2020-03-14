import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService } from '../services/purchase-order.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {

  purchaseOrderList;
  displayedColumns: string[] = ['id', 'code', 'date', 'totalPrice', 'userId'];

  constructor(public purchaseOrderService:PurchaseOrderService) { }

  ngOnInit() {
    //this.purchaseOrderService.get("header/findall")
    this.purchaseOrderService.pagination()
    .subscribe(res=>{
      this.purchaseOrderList = res;
      console.log(res);
    },err=>{
      console.error(err);
    })
  }

}