import { Component, OnInit } from '@angular/core';
import { ItemPickerService } from '../../services/item-picker.service';
import { ResponseData } from 'src/app/core/response-data';
import { RequestData } from 'src/app/core/request-data';
import { Item } from 'src/app/sales/models/item';
import { PageEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ajax } from 'rxjs/ajax';
import { debounceTime, distinctUntilChanged, filter, map, switchMap,tap } from 'rxjs/operators';

@Component({
  selector: 'app-item-picker',
  templateUrl: './item-picker.component.html',
  styleUrls: ['./item-picker.component.css']
})
export class ItemPickerComponent implements OnInit {

  public itemResponse:ResponseData<Item>;
  public itemRequest:RequestData;
  public IsLoading:boolean = false;
  public search = new FormControl('');

  displayedColumns: string[] = ['code', 'name'];

  constructor(
    public itemPickerService:ItemPickerService
  ) { }

  ngOnInit() {
    this.itemRequest = new RequestData();
    this.itemRequest.page=1;
    this.itemRequest.pageSize=5;
    this.itemRequest.filter = this.search.value;
    this.getItemPagination(this.itemRequest);
    this.SubcribeToEvent();
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
    this.itemRequest.filter = this.search.value;
    this.getItemPagination(this.itemRequest);
  }

  public SubcribeToEvent() {
    this.search.valueChanges
    .pipe(
      filter(text => text.length > 3 || text.length==0),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(key => {
        this.IsLoading = true;
        this.itemRequest.filter = key;
        return this.itemPickerService.pagination(this.itemRequest)
      })
    )
    .subscribe(res=>{
      this.itemResponse = res;
      this.IsLoading = false;
    },err=>{
      this.IsLoading = false;
      console.error(err);      
    });
  }

}
