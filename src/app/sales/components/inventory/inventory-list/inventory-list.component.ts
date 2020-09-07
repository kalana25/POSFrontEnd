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

  grnResponse:ResponseData<InventoryPagination>;
  grnRequest:RequestData
  public IsLoading:boolean=false;

  displayedColumns: string[] = ['id','action'];


  constructor(
    protected inventoryService:InventoryService,
    protected route:ActivatedRoute,
    protected router:Router) { 

  }

  ngOnInit() {
    this.grnRequest = new RequestData();
    this.grnRequest.page=1;
    this.grnRequest.pageSize=5;
    this.getInventoryPagination(this.grnRequest);
  }

  private getInventoryPagination(grnRequest:RequestData) {
    this.IsLoading = true;
    this.inventoryService.pagination(grnRequest)
    .subscribe(res=>{
      this.grnResponse = res;
      this.IsLoading = false;
      console.log(res);
    },err=>{
      this.IsLoading = false;
      console.error(err);
    })
  }

  public OnPage(event:PageEvent):void {
    this.grnRequest.pageSize = event.pageSize;
    this.grnRequest.page= event.pageIndex+1;
    this.getInventoryPagination(this.grnRequest);
  }

}
