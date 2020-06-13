import { Component, OnInit } from '@angular/core';
import { Product } from '../../../setup/models/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchaseOrderSave } from '../../models/purchase-order-save';
import { PurchaseOrderDetail } from '../../models/purchase-order-detail';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { RouteStateService } from 'src/app/shared/services/route-state.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PoDetailPickerComponent } from '../po-detail-picker/po-detail-picker.component';
import { MeasurementService } from 'src/app/setup/services/measurement.service';


@Component({
  selector: 'app-purchase-order-add',
  templateUrl: './purchase-order-add.component.html',
  styleUrls: ['./purchase-order-add.component.css']
})
export class PurchaseOrderAddComponent implements OnInit {
  selectedProductList:Array<{product:Product,details:PurchaseOrderDetail}> =[];
  totalPrice:number=0;

  constructor(
    private snackBar:MatSnackBar,
    private purchaseOrderService:PurchaseOrderService,
    private routerService:RouteStateService,
    private router:Router,
    private dialog:MatDialog,
    private measurementService:MeasurementService
  ) { }

  ngOnInit() {
  }

  public OnSelectProduct(product:Product) {

    this.measurementService.getByItem(product.id)
    .subscribe(res=>{

      if(res.length>0) {
        let dialogRef = this.dialog.open(PoDetailPickerComponent,
          {
            data:{'product':product,'measurement':res}
          });
        dialogRef.afterClosed().subscribe(closeRes=>{
          if(closeRes) {
            this.selectedProductList.push({product:closeRes.item,details:closeRes});
            this.totalPrice =0;//this.totalPrice + product.price* closeRes.quantity;
          }
        });

      } else {
        this.snackBar.open("Please configure the measurements","OK",{duration:2500});
      }
    },err=>{
      console.error(err);
    });

  }

  public OnModelReceived(model:PurchaseOrderSave) {
    if(model && model!==null) {
      if(this.selectedProductList.length==0)
      {
        this.snackBar.open("Please select items","OK",{duration:2500});
      } else {
        model.items = this.selectedProductList.map(x=>x.details);
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

  public OnItemDelete(item:{product:Product,details:PurchaseOrderDetail}){
    this.totalPrice = 0;//this.totalPrice-item.product.price;
  }

}
