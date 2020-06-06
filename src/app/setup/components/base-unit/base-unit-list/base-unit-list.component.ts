import { Component, OnInit } from '@angular/core';
import { BaseUnitService } from '../../../services/base-unit.service';
import { BaseUnit } from '../../../models/base-unit';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/dialog-data'
// import { SupplierDeleteDialogComponent } from '../supplier-delete-dialog/supplier-delete-dialog.component';
// import { SupplierEditComponent } from '../supplier-edit/supplier-edit.component';
import { ResponseData } from 'src/app/core/response-data';
import { RequestData } from 'src/app/core/request-data';
import { PageEvent } from '@angular/material';

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
      console.error(err);
    })
  }

  public OnPage(event:PageEvent):void {
    this.baseUnitRequest.pageSize = event.pageSize;
    this.baseUnitRequest.page= event.pageIndex+1;
    this.getBaseUnitPagination(this.baseUnitRequest);
  }

  // OnAddClick() {
  //   this.router.navigate(['../supplier-new'],{relativeTo:this.route});
  // }

  // public OnDelete(id:number) {
  //   let dialogRef = this.dialog.open(SupplierDeleteDialogComponent,
  //     {
  //       width:'500px',
  //       height: '180px',
  //       data:id
  //     });
  //   dialogRef.afterClosed().subscribe(_=>{
  //     this.getSupplierPagination(this.supplierRequest);
  //   })
  // }

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
