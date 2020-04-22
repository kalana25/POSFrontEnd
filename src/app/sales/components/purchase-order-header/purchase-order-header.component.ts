import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { PurchaseOrderSave } from '../../models/purchase-order-save';

@Component({
  selector: 'app-purchase-order-header',
  templateUrl: './purchase-order-header.component.html',
  styleUrls: ['./purchase-order-header.component.css']
})
export class PurchaseOrderHeaderComponent implements OnInit {
  purchaseOrderHeader:FormGroup;
  @Output() purchaseOrderSaveModel = new EventEmitter<PurchaseOrderSave>();

  constructor(
    public fb:FormBuilder
  ) { 

  }

  ngOnInit() {
    this.purchaseOrderHeader = this.fb.group({
      date:[null,Validators.required],
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
