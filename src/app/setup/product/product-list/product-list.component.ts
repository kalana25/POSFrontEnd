import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/dialog-data';
import { ProductDeleteAction } from '../dialog-action/confirmation-action';
import { ProductEditComponent } from 'src/app/setup/product/product-edit/product-edit.component';
import { DialogContentComponent } from 'src/app/shared/components/dialog-content/dialog-content.component';
import { ResponseData } from 'src/app/core/response-data';
import { RequestData } from 'src/app/core/request-data';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productResponse:ResponseData<Product>;
  productRequest:RequestData;
  IsLoading:boolean = false;

  displayedColumns: string[] = ['code', 'name', 'price', 'barcode','action'];

  constructor(
    public productService:ProductService,
    private router:Router,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.productRequest = new RequestData();
    this.productRequest.page=1;
    this.productRequest.pageSize=5;
    this.getProductPagination(this.productRequest);
  }
  
  
  private getProductPagination(supplierRequest:RequestData) {
    this.IsLoading = true;
    this.productService.pagination(supplierRequest)
    .subscribe(res=>{
      this.productResponse = res;
      this.IsLoading = false;
      console.log(res);
    },err=>{
      this.IsLoading = false;
      console.error(err);
    })
  }
  
  public OnPage(event:PageEvent):void {
    this.productRequest.pageSize = event.pageSize;
    this.productRequest.page= event.pageIndex+1;
    this.getProductPagination(this.productRequest);
  }

  OnAddClick() {
    this.router.navigate(['/product-new'])
  }

  OnDelete(id:number) {
    let confrimData = new DialogData()
    confrimData.buttonCancel = true;
    confrimData.buttonConfim = true;
    confrimData.dialogTitle = "Product Delete";
    confrimData.dialogContent = "Are you sure you want to delete this product ?";
    confrimData.action = new ProductDeleteAction(this.productService,id);

    let dialogRef = this.dialog.open(DialogContentComponent,
      {
        width:'500px',
        height: '200px',
        data:confrimData
      });
    dialogRef.afterClosed().subscribe(res=>{
      this.getProductPagination(this.productRequest);
    })
  }

  public OnEdit(product:Product) {
    let dialogRef = this.dialog.open(ProductEditComponent,
      {
        data:product
      });
    dialogRef.afterClosed().subscribe(_=>{
      this.getProductPagination(this.productRequest);
    });
  }


}
