import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService } from '../services/purchase-order.service';
import { ResponseData } from 'src/app/core/response-data';
import { PurchaseOrder } from '../models/purchase-order';
import { PageEvent } from '@angular/material';
import { RequestData } from 'src/app/core/request-data';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {

  purchaseOrderResponse:ResponseData<PurchaseOrder>;
  purchaseOrderRequest:RequestData;
  IsLoading:boolean=false;

  displayedColumns: string[] = ['id', 'code', 'date', 'totalPrice', 'userId'];

  constructor(public purchaseOrderService:PurchaseOrderService) { }

  ngOnInit() {
    this.purchaseOrderRequest = new RequestData();
    this.purchaseOrderRequest.page=1;
    this.purchaseOrderRequest.pageSize=5;
    this.getPurchaseOrderPagination(this.purchaseOrderRequest);
  }

  public OnPage(event:PageEvent):void {
    this.purchaseOrderRequest.pageSize = event.pageSize;
    this.purchaseOrderRequest.page= event.pageIndex+1;
    this.getPurchaseOrderPagination(this.purchaseOrderRequest);
  }

  private getPurchaseOrderPagination(poRequest:RequestData) {
    this.IsLoading = true;
    this.purchaseOrderService.pagination(poRequest)
    .subscribe(res=>{
      this.purchaseOrderResponse = res;
      this.IsLoading = false;
      console.log(res);
    },err=>{
      this.IsLoading = false;
      console.error(err);
    })
  }

}