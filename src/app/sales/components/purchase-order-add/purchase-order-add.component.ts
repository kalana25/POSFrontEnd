import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchaseOrderSave } from '../../models/purchase-order-save';
import { PurchaseOrderDetail } from '../../models/purchase-order-detail';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { RouteStateService } from 'src/app/shared/services/route-state.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PoDetailPickerComponent } from '../po-detail-picker/po-detail-picker.component';


@Component({
  selector: 'app-purchase-order-add',
  templateUrl: './purchase-order-add.component.html',
  styleUrls: ['./purchase-order-add.component.css']
})
export class PurchaseOrderAddComponent implements OnInit {
  selectedProductList:Array<Product> =[];
  selectedPoDetails:Array<PurchaseOrderDetail> =[];

  constructor(
    private snackBar:MatSnackBar,
    private purchaseOrderService:PurchaseOrderService,
    private routerService:RouteStateService,
    private router:Router,
    private dialog:MatDialog
  ) { }

  ngOnInit() {
  }

  public OnSelectProduct(product) {
    console.log(product);
    this.selectedProductList.push(product);

    //open pick quantity componetn.
    let dialogRef = this.dialog.open(PoDetailPickerComponent,
      {
        data:product
      });
      dialogRef.afterClosed().subscribe(res=>{
        console.log(res);
        
      })
  }

  public OnModelReceived(model:PurchaseOrderSave) {
    if(model && model!==null) {
      if(this.selectedProductList.length==0)
      {
        this.snackBar.open("Please select items","OK",{duration:2500});
      } else {
        const details:Array<PurchaseOrderDetail> = this.selectedProductList.map(x=>{
          let model = new PurchaseOrderDetail();
          model.itemId = x.id;
          model.quantity = 1;
          model.unit = 1;
          return model;
        });
        model.items = details;
        this.purchaseOrderService.add(model)
        .subscribe(res=>{
          const previousUrl = this.routerService.getPreviousUrl();
          this.router.navigate([`${previousUrl}`]);
        },err=>{
          console.error(err);
        })
      }
    }
  }


}
