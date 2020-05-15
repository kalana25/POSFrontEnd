import { Component, OnInit, Output,OnChanges, EventEmitter, Input } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { PurchaseOrderSave } from '../../models/purchase-order-save';
import { SharedMemoryService } from '../../../shared/services/shared-memory.service';

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
    public fb:FormBuilder,
    public sharedMemoryservice:SharedMemoryService
  ) { 

  }

  ngOnChanges() {
    if(this.totalPrice) {
      this.purchaseOrderHeader.patchValue({'totalPrice':this.totalPrice});
    }
  }

  ngOnInit() {
    let userId= this.sharedMemoryservice.getLoggedUserId();
    this.purchaseOrderHeader = this.fb.group({
      date:[new Date(),Validators.required],
      deliveryDate:[new Date()],
      code:['',Validators.required],
      createdBy:[this.sharedMemoryservice.getLoggedUserId()],
      user:[{value:this.sharedMemoryservice.getLoggedUserEmail(), disabled:true}],
      totalPrice:[0,Validators.required]
    });
  }

  public OnSubmit() {
    if(this.purchaseOrderHeader.valid) {
      const model = new PurchaseOrderSave();
      model.code = this.purchaseOrderHeader.get('code').value;
      model.totalPrice = Number(this.purchaseOrderHeader.get('totalPrice').value);
      model.createdBy = this.purchaseOrderHeader.get('createdBy').value;
      model.date = this.purchaseOrderHeader.get('date').value;
      model.deliveryDate = this.purchaseOrderHeader.get('deliveryDate').value;
      this.purchaseOrderSaveModel.emit(model);
    } else {
      this.purchaseOrderSaveModel.emit(null);
    }
  }

}
