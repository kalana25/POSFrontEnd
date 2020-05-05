import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { ResponseData } from 'src/app/core/response-data';
import { PurchaseOrder } from '../../models/purchase-order';
import { PageEvent } from '@angular/material';
import { RequestData } from 'src/app/core/request-data';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseOrderDeleteAction } from '../dialog-action/confirmation-action';
import { DialogData } from 'src/app/core/dialog-data';
import { DialogContentComponent } from 'src/app/shared/components/dialog-content/dialog-content.component';
import { MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { BsActionMenuComponent } from '../bs-action-menu/bs-action-menu.component';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.css']
})
export class PurchaseOrderListComponent implements OnInit {

  purchaseOrderResponse:ResponseData<PurchaseOrder>;
  purchaseOrderRequest:RequestData;
  IsLoading:boolean=false;

  displayedColumns: string[] = ['id', 'code', 'date', 'totalPrice', 'userId','action'];

  constructor(
    protected purchaseOrderService:PurchaseOrderService,
    protected dialog:MatDialog,
    protected bottomSheet:MatBottomSheet,
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

  public OnAddClick() {
    this.router.navigate(['/purchase-order-add'])
  }

  OnDelete(id:number) {
    let confrimData = new DialogData()
    confrimData.buttonCancel = true;
    confrimData.buttonConfim = true;
    confrimData.dialogTitle = "Purchase Order Delete";
    confrimData.dialogContent = "Are you sure you want to delete this purchase order ?";
    confrimData.action = new PurchaseOrderDeleteAction(this.purchaseOrderService,id);

    let dialogRef = this.dialog.open(DialogContentComponent,
      {
        width:'500px',
        height: '200px',
        data:confrimData
      });
    dialogRef.afterClosed().subscribe(res=>{
      this.getPurchaseOrderPagination(this.purchaseOrderRequest);
    })
  }

  public OnEdit(purchaseOrder:PurchaseOrder) {
    console.log(purchaseOrder);
    this.bottomSheet.open(BsActionMenuComponent)
  }

  public OnViewDetails(purchaseOrder:PurchaseOrder) {
    this.router.navigate(["purchase-order-list-details"]);
  }

}