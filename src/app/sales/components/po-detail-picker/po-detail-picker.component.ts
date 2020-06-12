import { Component, OnInit,Inject } from '@angular/core';
import { PurchaseOrderDetailWithItem } from '../../models/purchase-order-detail-withItem';
import { Product } from '../../../setup/models/product';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MeasurementService } from 'src/app/setup/services/measurement.service';
import { MeasurementWithBaseUnit } from 'src/app/setup/models/measurement-with-baseunit';

@Component({
  selector: 'app-po-detail-picker',
  templateUrl: './po-detail-picker.component.html',
  styleUrls: ['./po-detail-picker.component.css']
})
export class PoDetailPickerComponent implements OnInit {

  model:PurchaseOrderDetailWithItem;
  quantity = new FormControl('1');
  measurements:Array<MeasurementWithBaseUnit>;

  constructor(
    public dialogRef:MatDialogRef<PoDetailPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Product,
    private measurementService:MeasurementService
  ) { }

  ngOnInit() {
    this.model = new PurchaseOrderDetailWithItem;
    this.measurementService.getByItem(this.data.id)
    .subscribe(res=>{
      this.measurements = res;
    },err=>{
      console.error(err);      
    })
  }

  public OnCancel() {
    this.dialogRef.close(undefined);
  }

  public OnConfirm() {

    if(this.quantity.valid) {
      this.model.unit = 1;
      this.model.itemId = this.data.id;
      this.model.quantity = Number(this.quantity.value);
      this.model.item = this.data;
      this.dialogRef.close(this.model);
    }

  }

}
