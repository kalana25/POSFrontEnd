import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { Supplier } from '../../../models/supplier';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/dialog-data'
import { SupplierDeleteDialogComponent } from '../supplier-delete-dialog/supplier-delete-dialog.component';
import { SupplierEditComponent } from '../supplier-edit/supplier-edit.component';
import { ResponseData } from 'src/app/core/response-data';
import { RequestData } from 'src/app/core/request-data';
import { PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  supplierResponse:ResponseData<Supplier>;
  supplierRequest:RequestData;
  IsLoading:boolean=false;
  
  displayedColumns: string[] = ['code', 'name', 'contactNo', 'telephone', 'email','action'];

  constructor(
    public supplierService:SupplierService,
    private router:Router,
    private route:ActivatedRoute,
    private toasterService:ToastrService,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.supplierRequest = new RequestData();
    this.supplierRequest.page=1;
    this.supplierRequest.pageSize=5;
    this.getSupplierPagination(this.supplierRequest);
  }


  private getSupplierPagination(supplierRequest:RequestData) {
    this.IsLoading = true;
    this.supplierService.pagination(supplierRequest)
    .subscribe(res=>{
      this.supplierResponse = res;
      this.IsLoading = false;
      console.log(res);
    },err=>{
      this.IsLoading = false;
      this.toasterService.error("Please check the internet connection","Something Bad happen")
      console.error(err);
    })
  }

  public OnPage(event:PageEvent):void {
    this.supplierRequest.pageSize = event.pageSize;
    this.supplierRequest.page= event.pageIndex+1;
    this.getSupplierPagination(this.supplierRequest);
  }

  OnAddClick() {
    this.router.navigate(['../supplier-new'],{relativeTo:this.route});
  }

  public OnDelete(id:number) {
    let dialogRef = this.dialog.open(SupplierDeleteDialogComponent,
      {
        width:'500px',
        height: '180px',
        data:id
      });
    dialogRef.afterClosed().subscribe(_=>{
      this.getSupplierPagination(this.supplierRequest);
    })
  }

  public OnEdit(supplier:Supplier) {
    console.log(supplier);
    let dialogRef = this.dialog.open(SupplierEditComponent,
      {
        data:supplier
      });
    dialogRef.afterClosed().subscribe(_=>{
      this.getSupplierPagination(this.supplierRequest);
    })
  }



}
