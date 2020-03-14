import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService } from '../services/purchase-order.service';
import { ResponseData } from 'src/app/core/response-Data';
import { PurchaseOrder } from '../models/purchase-order';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {

  purchaseOrderResponse:ResponseData<PurchaseOrder>;
  displayedColumns: string[] = ['id', 'code', 'date', 'totalPrice', 'userId'];

  constructor(public purchaseOrderService:PurchaseOrderService) { }

  ngOnInit() {
    this.purchaseOrderService.pagination()
    .subscribe(res=>{
      this.purchaseOrderResponse = res;
      console.log(res);
    },err=>{
      console.error(err);
    })
  }

  private Test():void {
    this.purchaseOrderResponse.totalCount;
  }

}