import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { PurchaseOrderFullInfo } from '../../models/purchase-order-fullinfo';

@Component({
  selector: 'app-purchase-order-edit',
  templateUrl: './purchase-order-edit.component.html',
  styleUrls: ['./purchase-order-edit.component.css']
})
export class PurchaseOrderEditComponent implements OnInit {
  public id:string;
  public purchaseOrder:PurchaseOrderFullInfo
  public editForm:FormGroup;

  public displayedColumns: string[] = ['code', 'name', 'price', 'barcode','quantity','unit','action'];

  constructor(
    protected fb:FormBuilder,
    protected router:Router,
    protected route:ActivatedRoute,
    protected purchaseOrderService:PurchaseOrderService
  ) { }

  ngOnInit() {
    this.initForm();
    
    this.route.params.subscribe(para=>{
      this.id = para['id'];
      this.getPurchaseOrderInfo();
    });

  }
  
  private getPurchaseOrderInfo() {    
    this.purchaseOrderService.getWithFullInfo(Number(this.id))
    .subscribe(res=>{
      this.purchaseOrder = res;
      this.patchForm();
    },err=>{
      console.error(err);
    })
  }

  private patchForm() {
    this.editForm.patchValue({
      id:this.purchaseOrder.id,
      code:this.purchaseOrder.code,
      date:this.purchaseOrder.date,
      deliveryDate:this.purchaseOrder.deliveryDate,
      createdByName:this.purchaseOrder.createdByName,
      totalPrice:this.purchaseOrder.totalPrice
    })
  }

  private initForm() {
    this.editForm = this.fb.group({
      id:[''],
      code:['',Validators.required],
      date:['',Validators.required],
      deliveryDate:[''],
      createdByName:['',Validators.required],
      totalPrice:['',Validators.required]
    });
  }

}
