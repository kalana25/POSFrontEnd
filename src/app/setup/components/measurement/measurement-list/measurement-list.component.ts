import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/setup/models/product';
import { ResponseData } from 'src/app/core/response-data';
import { RequestData } from 'src/app/core/request-data';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, PageEvent } from '@angular/material';
import { DialogData } from 'src/app/core/dialog-data';
import { DialogContentComponent } from 'src/app/shared/components/dialog-content/dialog-content.component';
import { DiscountDeleteAction } from '../../product/dialog-action/disount-confirmation-action';
import { MeasurementService } from 'src/app/setup/services/measurement.service';
import { MeasurementInfo } from 'src/app/setup/models/measurement-info';
// import { DiscountEditComponent} from '../discount-edit/discount-edit.component';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.css']
})
export class MeasurementListComponent implements OnInit {
  public item:Product;
  measurementResponse:ResponseData<MeasurementInfo>;
  measurementRequest:RequestData;
  IsLoading:boolean=false;
  
  displayedColumns: string[] = ['name', 'symbol', 'quantity', 'baseUnitName','comment','action'];
  constructor(
    public route:ActivatedRoute,
    public router:Router,
    public measurementService:MeasurementService
  ) { }

  ngOnInit() {
    //this.data = this.route.snapshot.paramMap.get('name');
    this.item = this.route.snapshot.params as Product;
    this.measurementRequest = new RequestData();
    this.measurementRequest.page=1;
    this.measurementRequest.pageSize=5;
    this.measurementRequest.filter = this.item.id.toString();
    this.getMeasurementPagination(this.measurementRequest);
  }

  private getMeasurementPagination(measureRequest:RequestData) {
    this.IsLoading = true;
    this.measurementService.pagination(measureRequest)
    .subscribe(res=>{
      this.measurementResponse = res;
      this.IsLoading = false;
      console.log(res);
    },err=>{
      this.IsLoading = false;
      console.error(err);
    })
  }

  public OnPage(event:PageEvent):void {
    this.measurementRequest.pageSize = event.pageSize;
    this.measurementRequest.page= event.pageIndex+1;
    this.getMeasurementPagination(this.measurementRequest);
  }

  OnAddClick() {
    this.router.navigate(['../measurement-new'],{relativeTo:this.route});
  }

  public OnGoBack() {
    this.router.navigate(['../product-list'],{relativeTo:this.route});
  }

}
