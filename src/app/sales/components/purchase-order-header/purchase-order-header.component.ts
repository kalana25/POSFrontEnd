import { Component, OnInit, Output,OnChanges, EventEmitter, Input } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { PurchaseOrderSave } from '../../models/purchase-order-save';

@Component({
  selector: 'app-purchase-order-header',
  templateUrl: './purchase-order-header.component.html',
  styleUrls: ['./purchase-order-header.component.css']
})
export class PurchaseOrderHeaderComponent implements OnInit,OnChanges {
  purchaseOrderHeader:FormGroup;
  @Output() purchaseOrderSaveModel = new EventEmitter<PurchaseOrderSave>();
  @Input() totalPrice;

  constructor(
    public fb:FormBuilder
  ) { 

  }

  ngOnChanges() {
    if(this.totalPrice) {
      this.purchaseOrderHeader.patchValue({'totalPrice':this.totalPrice});
    }
  }

  ngOnInit() {
    this.purchaseOrderHeader = this.fb.group({
      date:[new Date(),Validators.required],
      code:['',Validators.required],
      userId:[0,],
      totalPrice:[0,Validators.required]
    });
  }

  public OnSubmit() {
    if(this.purchaseOrderHeader.valid) {
      const model = new PurchaseOrderSave();
      model.code = this.purchaseOrderHeader.get('code').value;
      model.totalPrice = Number(this.purchaseOrderHeader.get('totalPrice').value);
      model.userId = Number(this.purchaseOrderHeader.get('userId').value);
      model.date = this.purchaseOrderHeader.get('date').value;
      this.purchaseOrderSaveModel.emit(model);
    } else {
      this.purchaseOrderSaveModel.emit(null);
    }
  }

}
