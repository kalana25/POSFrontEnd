import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/dialog-data';
import { ProductDeleteAction } from '../dialog-action/confirmation-action';
import { ProductEditComponent } from 'src/app/setup/product/product-edit/product-edit.component';
import { DialogContentComponent } from 'src/app/shared/components/dialog-content/dialog-content.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList:Array<Product>;
  IsLoading:boolean = false;

  constructor(
    public productService:ProductService,
    private router:Router,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.LoadProductList();
  }

  private LoadProductList() {
    this.IsLoading = true;
    const endPoint = "findall"
    this.productService.get(endPoint)
    .subscribe(res=>{
      this.IsLoading = false;
      this.productList = res;
    })
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
        height: '180px',
        data:confrimData
      });
    dialogRef.afterClosed().subscribe(res=>{
      this.LoadProductList();
    })
  }

  public OnEdit(product:Product) {
    let dialogRef = this.dialog.open(ProductEditComponent,
      {
        data:product
      });
    dialogRef.afterClosed().subscribe(_=>{
      this.LoadProductList();
    });
  }


}
