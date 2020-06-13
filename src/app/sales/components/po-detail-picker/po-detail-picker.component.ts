import { Component, OnInit,Inject } from '@angular/core';
import { PurchaseOrderDetailWithItem } from '../../models/purchase-order-detail-withItem';
import { Product } from '../../../setup/models/product';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeasurementWithBaseUnit } from 'src/app/setup/models/measurement-with-baseunit';

@Component({
  selector: 'app-po-detail-picker',
  templateUrl: './po-detail-picker.component.html',
  styleUrls: ['./po-detail-picker.component.css']
})
export class PoDetailPickerComponent implements OnInit {

  model:PurchaseOrderDetailWithItem;
  measurements:Array<MeasurementWithBaseUnit>;
  poDetailPickerFormGroup:FormGroup;

  constructor(
    private fb:FormBuilder,
    public dialogRef:MatDialogRef<PoDetailPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{product:Product,measurement:Array<MeasurementWithBaseUnit>},
  ) { }

  ngOnInit() {
    this.initFormGroup();
    this.model = new PurchaseOrderDetailWithItem;
    this.measurements = this.data.measurement;
  }

  public OnCancel() {
    this.dialogRef.close(undefined);
  }

  public OnConfirm() {

    if(this.poDetailPickerFormGroup.valid) {
      this.model.unitPrice = this.poDetailPickerFormGroup.get('unitPrice').value;
      this.model.unit = this.poDetailPickerFormGroup.get('unit').value;
      this.model.itemId = this.data.product.id;
      this.model.quantity = Number(this.poDetailPickerFormGroup.get('quantity').value);
      this.model.item = this.data.product;
      this.dialogRef.close(this.model);
    }

  }

  private initFormGroup() {
    this.poDetailPickerFormGroup = this.fb.group({
      quantity:['',Validators.required],
      unit:['',Validators.required],
      unitPrice:['',Validators.required]
    });
  }

}
