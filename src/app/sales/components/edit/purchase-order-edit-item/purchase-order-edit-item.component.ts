import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseOrderDetailWithItem } from 'src/app/sales/models/purchase-order-detail-withItem';
import { FormControl,FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-purchase-order-edit-item',
  templateUrl: './purchase-order-edit-item.component.html',
  styleUrls: ['./purchase-order-edit-item.component.css']
})
export class PurchaseOrderEditItemComponent implements OnInit {

  public itemEditFormGroup:FormGroup;

  constructor(
    protected fb:FormBuilder,
    protected dialogRef:MatDialogRef<PurchaseOrderEditItemComponent>,
    @Inject(MAT_DIALOG_DATA) protected data:PurchaseOrderDetailWithItem
  ) { }

  ngOnInit() {
    this.initForm();
    this.patchValue();
  }

  public OnCancel() {
    this.dialogRef.close(undefined);
  }

  public OnConfirm() {
    if(this.itemEditFormGroup.valid) {
      this.data.quantity =this.itemEditFormGroup.get('quantity').value;
      this.data.unit = this.itemEditFormGroup.get('unit').value;
      this.dialogRef.close(this.data);
    }
  }

  private initForm() {
    this.itemEditFormGroup = this.fb.group({
      quantity:['',Validators.required],
      unit:['',Validators.required]
    })
  }

  private patchValue() {
    this.itemEditFormGroup.setValue({
      quantity:this.data.quantity,
      unit:this.data.unit
    });
  }

}
