import { Component, OnInit,Inject } from '@angular/core';
import { PurchaseOrderDetail } from '../../models/purchase-order-detail';
import { Product } from '../../../models/product';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-po-detail-picker',
  templateUrl: './po-detail-picker.component.html',
  styleUrls: ['./po-detail-picker.component.css']
})
export class PoDetailPickerComponent implements OnInit {

  model:PurchaseOrderDetail;
  quantity = new FormControl('1');

  constructor(
    public dialogRef:MatDialogRef<PoDetailPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Product,
  ) { }

  ngOnInit() {
    this.model = new PurchaseOrderDetail();
  }

  public OnCancel() {
    this.dialogRef.close();
  }

  public OnConfirm() {

    if(this.quantity.valid) {
      this.model.unit = 1;
      this.model.itemId = this.data.id;
      this.model.quantity = this.quantity.value;
      this.dialogRef.close(this.model);
    }

  }

}
