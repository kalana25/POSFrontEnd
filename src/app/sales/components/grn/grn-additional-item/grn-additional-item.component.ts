import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/setup/models/product';
import { MeasurementService } from 'src/app/setup/services/measurement.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { PoDetailPickerComponent } from '../../po-detail-picker/po-detail-picker.component';
import { PurchaseOrderDetailFullItem } from 'src/app/sales/models/purchase-order-detail-fullInfo';

@Component({
  selector: 'app-grn-additional-item',
  templateUrl: './grn-additional-item.component.html',
  styleUrls: ['./grn-additional-item.component.css']
})
export class GrnAdditionalItemComponent implements OnInit {

  public itemList:Array<PurchaseOrderDetailFullItem>=[];
  constructor(
    private measurementService:MeasurementService,
    private snackBar:MatSnackBar,
    private dialog:MatDialog
  ) { }

  ngOnInit() {
  }

  public OnSelectProduct(product:Product) {

    this.measurementService.getByItem(product.id)
    .subscribe(mesRes=>{
      if(mesRes.length>0) {

        let dialogRef = this.dialog.open(PoDetailPickerComponent,
        {
          data:{'product':product,'measurement':mesRes},
          width:'230px'
        });

        dialogRef.afterClosed().subscribe(res=>{
          if(res) {
            // re calculate total Price
            // this.purchaseOrder.items.push(res);
            this.itemList.push(res);
            // this.tableReference.renderRows();
            // this.purchaseOrder.totalPrice +=res.quantity*res.unitPrice;
            // this.editForm.get('totalPrice').patchValue(this.purchaseOrder.totalPrice); 
          }
        });

      } else {
        this.snackBar.open("Please configure the measurements","OK",{duration:2500});
      }
    }, err=>{
      console.error(err);      
    });

  }

}
