import { Component, OnInit } from '@angular/core';
import { ResponseData } from 'src/app/core/response-data';
import { InventoryPagination } from 'src/app/sales/models/inventory-pagination';
import { RequestData } from 'src/app/core/request-data';
import { InventoryService } from 'src/app/sales/services/inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { noTwoWhiteSpacesValidator } from 'src/app/shared/Validations/common-validation';
import { element } from 'protractor';
import { InventoryListDetailTableData } from '../inventory-list-detail/inventory-list-detail.component';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class InventoryListComponent implements OnInit {

  inventoryResponse:ResponseData<InventoryPagination>;
  inventoryRequest:RequestData
  public IsLoading:boolean=false;
  public InventoryDetailsLoading:boolean = false;

  displayedColumns: string[] = ['code','name','stock','reOrderLevel','barcode','unit'];
  expandedElement:any|null;
  expandedDetails:any|null;


  constructor(
    protected inventoryService:InventoryService,
    protected route:ActivatedRoute,
    private toasterService:ToastrService,
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
      this.toasterService.error("Please check the internet connection","Something Bad happen")
      console.error(err);
    })
  }

  public OnPage(event:PageEvent):void {
    this.inventoryRequest.pageSize = event.pageSize;
    this.inventoryRequest.page= event.pageIndex+1;
    this.getInventoryPagination(this.inventoryRequest);
  }

  public OnRowClick(input) {
    this.expandedElement = this.expandedElement===input ? null : input;
    this.InventoryDetailsLoading = true;
    setTimeout(() => {
      this.inventoryService.getWithFullInfo(input.id)
      .subscribe(res=>{
        console.log(res);
        
        this.expandedDetails = this.expandedDetails===res ? null : res.details.map(x=>{
          let orderedUnit:string = x.isBaseUnit ? res.unit.symbol : x.unit.symbol
          let purhaseUnit:any = x.unit;
          let quantityInBaseUnit:number = x.isBaseUnit ? x.quantity : x.quantity* purhaseUnit.quantity;
          return new InventoryListDetailTableData (
            x.goodReceivedNote.code,
            x.goodReceivedNote.grnDate,
            x.stockInDate,
            x.expireDate,
            x.quantity,
            orderedUnit,
            quantityInBaseUnit,
            res.unit.symbol);
        })
        this.InventoryDetailsLoading = false
      },err=>{
        this.toasterService.error("Please check the internet connection","Something Bad happen")
        this.InventoryDetailsLoading = false
      })
    }, 400);
    
  }

}
