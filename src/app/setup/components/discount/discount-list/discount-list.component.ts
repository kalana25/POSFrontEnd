import { Component, OnInit } from '@angular/core';
import { DiscountInfo } from 'src/app/setup/models/discount-info';
import { ResponseData } from 'src/app/core/response-data';
import { RequestData } from 'src/app/core/request-data';
import { DiscountService } from 'src/app/setup/services/discount.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, PageEvent } from '@angular/material';
import { DialogData } from 'src/app/core/dialog-data';
import { DialogContentComponent } from 'src/app/shared/components/dialog-content/dialog-content.component';
import { DiscountDeleteAction } from '../../product/dialog-action/disount-confirmation-action';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.css']
})
export class DiscountListComponent implements OnInit {

  discountResponse:ResponseData<DiscountInfo>;
  discountRequest:RequestData;
  IsLoading:boolean=false;
  
  displayedColumns: string[] = ['itemName', 'rate', 'startDate', 'endDate','action'];

  constructor(
    public discountService:DiscountService,
    private router:Router,
    private route:ActivatedRoute,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.discountRequest = new RequestData();
    this.discountRequest.page=1;
    this.discountRequest.pageSize=5;
    this.getDiscountPagination(this.discountRequest);
  }


  private getDiscountPagination(discountRequest:RequestData) {
    this.IsLoading = true;
    this.discountService.pagination(discountRequest)
    .subscribe(res=>{
      this.discountResponse = res;
      this.IsLoading = false;
      console.log(res);
    },err=>{
      this.IsLoading = false;
      console.error(err);
    })
  }

  public OnPage(event:PageEvent):void {
    this.discountRequest.pageSize = event.pageSize;
    this.discountRequest.page= event.pageIndex+1;
    this.getDiscountPagination(this.discountRequest);
  }

  OnAddClick() {
    this.router.navigate(['../discount-new'],{relativeTo:this.route});
  }

  OnDelete(id:number) {
    let confrimData = new DialogData();
    confrimData.buttonCancel = true;
    confrimData.buttonConfim = true;
    confrimData.dialogTitle = "Discount Delete";
    confrimData.dialogContent = "Are you sure you want to delete this discount ?";
    confrimData.action = new DiscountDeleteAction(this.discountService,id);

    let dialogRef = this.dialog.open(DialogContentComponent,
      {
        width:'500px',
        height: '200px',
        data:confrimData
      });
    dialogRef.afterClosed().subscribe(res=>{
      this.getDiscountPagination(this.discountRequest);
    })
  }

  // public OnEdit(supplier:Supplier) {
  //   console.log(supplier);
  //   let dialogRef = this.dialog.open(SupplierEditComponent,
  //     {
  //       data:supplier
  //     });
  //   dialogRef.afterClosed().subscribe(_=>{
  //     this.getSupplierPagination(this.supplierRequest);
  //   })
  // }

}
