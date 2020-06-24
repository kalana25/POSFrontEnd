import { Component, OnInit } from '@angular/core';
import { ResponseData } from 'src/app/core/response-data';
import { RequestData } from 'src/app/core/request-data';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { MatDialog, MatBottomSheet, PageEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseOrderPagination } from '../../models/purchase-order-pagination';

@Component({
  selector: 'app-po-picker',
  templateUrl: './po-picker.component.html',
  styleUrls: ['./po-picker.component.css']
})
export class PoPickerComponent implements OnInit {

  purchaseOrderResponse:ResponseData<PurchaseOrderPagination>;
  purchaseOrderRequest:RequestData;
  IsLoading:boolean=false;

  displayedColumns: string[] = ['code', 'date','supplierName', 'totalPrice', 'userId','action'];

  constructor(
    protected purchaseOrderService:PurchaseOrderService,
    protected dialog:MatDialog,
    protected bottomSheet:MatBottomSheet,
    protected route:ActivatedRoute,
    protected router:Router) { 

  }

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
