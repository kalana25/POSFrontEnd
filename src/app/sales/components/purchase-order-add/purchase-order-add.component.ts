import { Component, OnInit } from '@angular/core';
import { Product } from '../../../setup/models/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchaseOrderSave } from '../../models/purchase-order-save';
import { PurchaseOrderDetail } from '../../models/purchase-order-detail';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { Router, ActivatedRoute } from '@angular/router';
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
    private router:Router,
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private measurementService:MeasurementService
  ) { }

  ngOnInit() {
  }

  public OnSelectProduct(product:Product) {

    this.measurementService.getByItem(product.id)
    .subscribe(res=>{
      let input;
      if(res.length>0) {
        input = {'product':product,'measurement':res,baseUnitOnly:false};
      } else {
        input = {'product':product,'measurement':res,baseUnitOnly:true};
      }
      let dialogRef = this.dialog.open(PoDetailPickerComponent,
        {
          data:input,
          width:'230px'
        });
      dialogRef.afterClosed().subscribe(closeRes=>{
        if(closeRes) {
          this.selectedProductList.push({product:closeRes.item,details:closeRes});
          this.totalPrice = this.totalPrice + closeRes.unitPrice * closeRes.quantity;
        }
      });

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
          this.router.navigate(['../purchase-order-list'],{relativeTo:this.route});
        },err=>{
          console.error(err);
        })
      }
    }
  }

  public OnItemDelete(item:{product:Product,details:PurchaseOrderDetail}){
    this.totalPrice = this.totalPrice-item.details.unitPrice;
  }

}
