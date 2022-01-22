import { Component, OnInit } from '@angular/core';
import { BaseUnitService } from '../../../services/base-unit.service';
import { BaseUnit } from '../../../models/base-unit';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/dialog-data'
import { DialogContentComponent } from 'src/app/shared/components/dialog-content/dialog-content.component';
import { ResponseData } from 'src/app/core/response-data';
import { RequestData } from 'src/app/core/request-data';
import { PageEvent } from '@angular/material';
import { BaseUnitDeleteAction } from '../dialog-action/base-unit-confirmation-action';
import { BaseUnitEditComponent } from '../base-unit-edit/base-unit-edit.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-base-unit-list',
  templateUrl: './base-unit-list.component.html',
  styleUrls: ['./base-unit-list.component.css']
})
export class BaseUnitListComponent implements OnInit {

  baseUnitResponse:ResponseData<BaseUnit>;
  baseUnitRequest:RequestData;
  IsLoading:boolean=false;
  
  displayedColumns: string[] = [ 'name', 'description', 'symbol','action'];

  constructor(
    public baseUnitService:BaseUnitService,
    private router:Router,
    private route:ActivatedRoute,
    private toasterService:ToastrService,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.baseUnitRequest = new RequestData();
    this.baseUnitRequest.page=1;
    this.baseUnitRequest.pageSize=5;
    this.getBaseUnitPagination(this.baseUnitRequest);
  }

  private getBaseUnitPagination(baseUnitRequest:RequestData) {
    this.IsLoading = true;
    this.baseUnitService.pagination(baseUnitRequest)
    .subscribe(res=>{
      this.baseUnitResponse = res;
      this.IsLoading = false;
      console.log(res);
    },err=>{
      this.IsLoading = false;
      this.toasterService.error("Please check the internet connection","Something Bad happen")
      console.error(err);
    })
  }

  public OnPage(event:PageEvent):void {
    this.baseUnitRequest.pageSize = event.pageSize;
    this.baseUnitRequest.page= event.pageIndex+1;
    this.getBaseUnitPagination(this.baseUnitRequest);
  }

  OnAddClick() {
    this.router.navigate(['../base-unit-new'],{relativeTo:this.route});
  }

  OnDelete(id:number) {
    let confrimData = new DialogData();
    confrimData.buttonCancel = true;
    confrimData.buttonConfim = true;
    confrimData.dialogTitle = "Base Unit Delete";
    confrimData.dialogContent = "Are you sure you want to delete this base unit ?";
    confrimData.action = new BaseUnitDeleteAction(this.baseUnitService,id);

    let dialogRef = this.dialog.open(DialogContentComponent,
      {
        width:'500px',
        height: '200px',
        data:confrimData
      });
    dialogRef.afterClosed().subscribe(res=>{
      this.getBaseUnitPagination(this.baseUnitRequest);
    })
  }

  public OnEdit(baseUnit:BaseUnit) {
    console.log(baseUnit);
    let dialogRef = this.dialog.open(BaseUnitEditComponent,
      {
        data:baseUnit
      });
    dialogRef.afterClosed().subscribe(_=>{
      this.getBaseUnitPagination(this.baseUnitRequest);
    })
  }

}
