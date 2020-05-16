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
    });

    this.purchaseOrderService.getWithFullInfo(Number(this.id))
    .subscribe(res=>{
      this.purchaseOrder = res;
      console.log(res);
    },err=>{
      console.error(err);
    })
  }

  private initForm() {
    this.editForm = this.fb.group({
      id:[''],
      code:['',Validators.required],
      date:['',Validators.required],
      deliveryDate:[''],
    });
  }

}
