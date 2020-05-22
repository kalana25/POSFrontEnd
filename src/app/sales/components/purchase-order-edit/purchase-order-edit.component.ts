import { Component, OnInit,ViewChild } from '@angular/core';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { PurchaseOrderFullInfo } from '../../models/purchase-order-fullinfo';
import { Item } from 'src/app/shared/models/item';
import { MatTable } from '@angular/material';
import { PurchaseOrderDetailWithItem } from '../../models/purchase-order-detail-withItem';

@Component({
  selector: 'app-purchase-order-edit',
  templateUrl: './purchase-order-edit.component.html',
  styleUrls: ['./purchase-order-edit.component.css']
})
export class PurchaseOrderEditComponent implements OnInit {
  public id:string;
  public IsLoading:boolean;
  public purchaseOrder:PurchaseOrderFullInfo
  public editForm:FormGroup;

  public displayedColumns: string[] = ['code', 'name', 'price', 'barcode','quantity','unit','action'];

  @ViewChild(MatTable,{
    static:false
  })
  private tableReference:MatTable<PurchaseOrderDetailWithItem>

  constructor(
    protected fb:FormBuilder,
    protected router:Router,
    protected route:ActivatedRoute,
    protected purchaseOrderService:PurchaseOrderService
  ) { }

  ngOnInit() {
    this.initForm();
    this.IsLoading= true;
    this.route.params.subscribe(para=>{
      this.id = para['id'];
      this.getPurchaseOrderInfo();
    });

  }
  
  private getPurchaseOrderInfo() {    
    this.purchaseOrderService.getWithFullInfo(Number(this.id))
    .subscribe(res=>{
      this.purchaseOrder = res;
      this.IsLoading = false;
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

  public OnItemRemove(id:number){
    let index:number = this.purchaseOrder.items.findIndex(x=>x.itemId===id);
    if(index!==-1) {
      // re calculate grant total
      this.purchaseOrder.items.splice(index,1);
      this.tableReference.renderRows();
    }
  }

}
