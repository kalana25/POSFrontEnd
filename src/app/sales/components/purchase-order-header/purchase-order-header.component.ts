import { Component, OnInit, Output,OnChanges, EventEmitter, Input } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { PurchaseOrderSave } from '../../models/purchase-order-save';
import { SharedMemoryService } from '../../../shared/services/shared-memory.service';
import { SupplierService } from 'src/app/setup/services/supplier.service';
import { Supplier } from 'src/app/setup/models/supplier';
import { PurchaseOrderService } from '../../services/purchase-order.service';

@Component({
  selector: 'app-purchase-order-header',
  templateUrl: './purchase-order-header.component.html',
  styleUrls: ['./purchase-order-header.component.css']
})
export class PurchaseOrderHeaderComponent implements OnInit,OnChanges {
  purchaseOrderHeader:FormGroup;
  @Output() purchaseOrderSaveModel = new EventEmitter<PurchaseOrderSave>();
  @Input() totalPrice;
  public supplierList:Array<Supplier>;

  constructor(
    public fb:FormBuilder,
    public supplierService:SupplierService,
    protected purchaseOrderService:PurchaseOrderService,
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
    this.initForm();
    this.purchaseOrderService.getNextCode()
    .subscribe(res=>{
      if(res){
        this.purchaseOrderHeader.get('code').patchValue(res.code);
      }
    },err=>{
      console.error(err);
    })
    this.GetSupplierData();
  }

  private initForm() {
    this.purchaseOrderHeader = this.fb.group({
      date:[new Date(),Validators.required],
      deliveryDate:[new Date()],
      code:['',Validators.required],
      supplierId:['',Validators.required],
      user:[{value:this.sharedMemoryservice.getLoggedUserEmail(), disabled:true}],
      totalPrice:[0,Validators.required]
    });
  }

  public OnSubmit() {
    if(this.purchaseOrderHeader.valid) {
      const model = new PurchaseOrderSave();
      model.code = this.purchaseOrderHeader.get('code').value;
      model.totalPrice = Number(this.purchaseOrderHeader.get('totalPrice').value);
      model.date = this.purchaseOrderHeader.get('date').value;
      model.deliveryDate = this.purchaseOrderHeader.get('deliveryDate').value;
      model.supplierId = this.purchaseOrderHeader.get('supplierId').value;
      this.purchaseOrderSaveModel.emit(model);
    } else {
      this.purchaseOrderSaveModel.emit(null);
    }
  }

  public GetSupplierData() {
    this.supplierService.get("findall")
    .subscribe(res=>{
      this.supplierList = res;
    },err=>{
      console.error(err);
    })
  }

}
