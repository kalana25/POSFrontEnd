import { Component, OnInit } from '@angular/core';
import { ItemPickerService } from '../../services/item-picker.service';
import { ResponseData } from 'src/app/core/response-data';
import { RequestData } from 'src/app/core/request-data';
import { Item } from 'src/app/sales/models/item';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-item-picker',
  templateUrl: './item-picker.component.html',
  styleUrls: ['./item-picker.component.css']
})
export class ItemPickerComponent implements OnInit {

  itemResponse:ResponseData<Item>;
  itemRequest:RequestData;
  IsLoading:boolean = false;

  displayedColumns: string[] = ['code', 'name'];

  constructor(
    public itemPickerService:ItemPickerService
  ) { }

  ngOnInit() {
    this.itemRequest = new RequestData();
    this.itemRequest.page=1;
    this.itemRequest.pageSize=5;
    this.getItemPagination(this.itemRequest);
  }

  private getItemPagination(supplierRequest:RequestData) {
    this.IsLoading = true;
    this.itemPickerService.pagination(supplierRequest)
    .subscribe(res=>{
      this.itemResponse = res;
      this.IsLoading = false;
      console.log(res);
    },err=>{
      this.IsLoading = false;
      console.error(err);
    })
  }

  public OnPage(event:PageEvent):void {
    this.itemRequest.pageSize = event.pageSize;
    this.itemRequest.page= event.pageIndex+1;
    this.getItemPagination(this.itemRequest);
  }

}
