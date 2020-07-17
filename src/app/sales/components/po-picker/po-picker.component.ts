import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ResponseData } from 'src/app/core/response-data';
import { ExtendedRequestData } from 'src/app/core/extended-request-data';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { MatDialog, MatBottomSheet, PageEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseOrderPagination } from '../../models/purchase-order-pagination';
import { FormGroup, FormBuilder } from '@angular/forms';
import { pipe } from 'rxjs'
import { debounceTime, distinctUntilChanged, filter, map, switchMap,tap } from 'rxjs/operators';

@Component({
  selector: 'app-po-picker',
  templateUrl: './po-picker.component.html',
  styleUrls: ['./po-picker.component.css']
})
export class PoPickerComponent implements OnInit {

  purchaseOrderResponse:ResponseData<PurchaseOrderPagination>;
  purchaseOrderRequest:ExtendedRequestData;
  IsLoading:boolean=false;
  public searchForm:FormGroup;
  @Output() public purchaseOrderSelect = new EventEmitter<PurchaseOrderPagination>();

  displayedColumns: string[] = ['code', 'date','supplierName', 'totalPrice', 'userId','action'];

  constructor(
    protected purchaseOrderService:PurchaseOrderService,
    protected dialog:MatDialog,
    protected bottomSheet:MatBottomSheet,
    protected route:ActivatedRoute,
    protected router:Router,
    protected fb:FormBuilder) { 

  }

  ngOnInit() {
    this.initForm();
    this.purchaseOrderRequest = new ExtendedRequestData();
    this.purchaseOrderRequest.page=1;
    this.purchaseOrderRequest.pageSize=5;
    this.getPurchaseOrderPagination(this.purchaseOrderRequest);
    this.SubcribeToEvent();
  }

  public OnPage(event:PageEvent):void {
    this.purchaseOrderRequest.pageSize = event.pageSize;
    this.purchaseOrderRequest.page= event.pageIndex+1;
    this.getPurchaseOrderPagination(this.purchaseOrderRequest);
  }

  private getPurchaseOrderPagination(poRequest:ExtendedRequestData) {
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

  private initForm() {
    this.searchForm = this.fb.group({
      searchText:[''],
      startDate:[''],
      endDate:['']
    });
  }

  public OnSeeMore(po:PurchaseOrderPagination) {
    this.purchaseOrderSelect.emit(po);
  }

  private SubcribeToEvent() {
    
    this.searchForm.get('searchText').valueChanges
    .pipe(
      tap(_=>{
        this.IsLoading = true;
       }),
      filter(text => text.length > 3 || text.length==0),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(key => {
        this.purchaseOrderRequest.filter = key;
        return this.purchaseOrderService.pagination(this.purchaseOrderRequest)
      })
    )
    .subscribe(res=>{
      this.purchaseOrderResponse = res;
      this.IsLoading = false;
    },err=>{
      this.IsLoading = false;
      console.error(err);      
    });

    this.searchForm.get('startDate').valueChanges
    .pipe(
      tap(_=>{
        this.IsLoading = true;
       }),
      //filter(text => text.length > 7 || text.length==0),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(key => {
        if (key!==null) {
          const date:Date = key;
          this.purchaseOrderRequest.from=new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate()));
        } else {
          this.purchaseOrderRequest.from =null;
        }
        return this.purchaseOrderService.pagination(this.purchaseOrderRequest)
      })
    )
    .subscribe(res=>{
      this.purchaseOrderResponse = res;
      this.IsLoading = false;
    },err=>{
      this.IsLoading = false;
      console.error(err);      
    });

    this.searchForm.get('endDate').valueChanges
    .pipe(
      tap(_=>{
        this.IsLoading = true;
       }),
      //filter(text => text.length > 7 || text.length==0),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(key => {
        if(key!==null) {
          const date:Date = key;
          this.purchaseOrderRequest.to =new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate()));
        } else {
          this.purchaseOrderRequest.to = null;
        }
        return this.purchaseOrderService.pagination(this.purchaseOrderRequest)
      })
    )
    .subscribe(res=>{
      this.purchaseOrderResponse = res;
      this.IsLoading = false;
    },err=>{
      this.IsLoading = false;
      console.error(err);      
    });
    
  }

}
