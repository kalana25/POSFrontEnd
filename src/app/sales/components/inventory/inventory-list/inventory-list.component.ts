import { Component, OnInit } from '@angular/core';
import { ResponseData } from 'src/app/core/response-data';
import { InventoryPagination } from 'src/app/sales/models/inventory-pagination';
import { RequestData } from 'src/app/core/request-data';
import { InventoryService } from 'src/app/sales/services/inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  inventoryResponse:ResponseData<InventoryPagination>;
  inventoryRequest:RequestData
  public IsLoading:boolean=false;

  displayedColumns: string[] = ['code','name','stock','reOrderLevel','barcode','unit'];


  constructor(
    protected inventoryService:InventoryService,
    protected route:ActivatedRoute,
    protected router:Router) { 

  }

  ngOnInit() {
    this.inventoryRequest = new RequestData();
    this.inventoryRequest.page=1;
    this.inventoryRequest.pageSize=5;
    this.getInventoryPagination(this.inventoryRequest);
  }

  private getInventoryPagination(invRequest:RequestData) {
    this.IsLoading = true;
    this.inventoryService.pagination(invRequest)
    .subscribe(res=>{
      this.inventoryResponse = res;
      this.IsLoading = false;
      console.log(res);
    },err=>{
      this.IsLoading = false;
      console.error(err);
    })
  }

  public OnPage(event:PageEvent):void {
    this.inventoryRequest.pageSize = event.pageSize;
    this.inventoryRequest.page= event.pageIndex+1;
    this.getInventoryPagination(this.inventoryRequest);
  }

}
