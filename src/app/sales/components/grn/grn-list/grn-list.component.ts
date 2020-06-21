import { Component, OnInit } from '@angular/core';
import { ResponseData } from 'src/app/core/response-data';
import { RequestData } from 'src/app/core/request-data';
import { GrnPagination } from 'src/app/sales/models/grn-pagination';
import { GoodReceivedNoteService } from 'src/app/sales/services/good-received-note.service';
import { MatDialog, MatBottomSheet, PageEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grn-list',
  templateUrl: './grn-list.component.html',
  styleUrls: ['./grn-list.component.css']
})
export class GrnListComponent implements OnInit {

  grnResponse:ResponseData<GrnPagination>;
  grnRequest:RequestData
  IsLoading:boolean=false;

  displayedColumns: string[] = ['id', 'code', 'grnDate','time','comment', 'createdByName','purchaseOrderCode','action'];

  constructor(
    protected grnService:GoodReceivedNoteService,
    protected dialog:MatDialog,
    protected bottomSheet:MatBottomSheet,
    protected route:ActivatedRoute,
    protected router:Router) { 

  }

  ngOnInit() {
    this.grnRequest = new RequestData();
    this.grnRequest.page=1;
    this.grnRequest.pageSize=5;
    this.getGrnPagination(this.grnRequest);
  }

  public OnPage(event:PageEvent):void {
    this.grnRequest.pageSize = event.pageSize;
    this.grnRequest.page= event.pageIndex+1;
    this.getGrnPagination(this.grnRequest);
  }

  private getGrnPagination(grnRequest:RequestData) {
    this.IsLoading = true;
    this.grnService.pagination(grnRequest)
    .subscribe(res=>{
      this.grnResponse = res;
      this.IsLoading = false;
      console.log(res);
    },err=>{
      this.IsLoading = false;
      console.error(err);
    })
  }

  public OnAddClick() {
    this.router.navigate(['../grn-add'],{relativeTo:this.route});
  }

}
