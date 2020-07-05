import { Component, OnInit,Input,OnChanges,ViewChild, ElementRef } from '@angular/core';
import { PurchaseOrderPagination } from 'src/app/sales/models/purchase-order-pagination';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { PurchaseOrderService } from 'src/app/sales/services/purchase-order.service';
import { PurchaseOrderDetailFullItem } from 'src/app/sales/models/purchase-order-detail-fullInfo';
import { FormArray } from '@angular/forms';
import { Unit } from 'src/app/sales/models/unit';
import { MatExpansionPanel, MatAccordion } from '@angular/material';

@Component({
  selector: 'app-grn-item',
  templateUrl: './grn-item.component.html',
  styleUrls: ['./grn-item.component.css']
})
export class GrnItemComponent implements OnInit,OnChanges {
  @Input() grnHeaderForm:FormGroup
  public IsItemLoading:boolean = false;
  public purchaseOrderDetails:Array<PurchaseOrderDetailFullItem>;
  public grnItemFormArray:FormArray;

  public unitArrayList:Array<Array<Unit>> =[];

  @ViewChild('accordion',{static:false}) private accordion:MatAccordion;

  constructor(
    private purchaseOrderService:PurchaseOrderService,
    private fb:FormBuilder
  ) { }

  ngOnChanges() {
    if(this.grnHeaderForm) {
      this.IsItemLoading = true;
      const poId:number = this.grnHeaderForm.get('purchaseOrderId').value;
      this.purchaseOrderService.getDetailsWithFullInfo(poId)
      .subscribe(res=>{
        this.IsItemLoading = false;
        this.purchaseOrderDetails = res;
        console.log(this.purchaseOrderDetails);
        
        //Create form group array
        this.grnItemFormArray = this.fb.array([]);
        this.purchaseOrderDetails.forEach(purchaseOrderDetail => {
          this.grnItemFormArray.push(
            this.fb.group({
              'expireDate':[''],
              'quantity':[purchaseOrderDetail.quantity,Validators.required],
              'unitId':[purchaseOrderDetail.unitId,Validators.required],
              'purchasePrice':[purchaseOrderDetail.unitPrice,Validators.required],
              'sellingPrice':['',Validators.required]
            })
          );

          // unit list
          const unit = new Unit();
          unit.id = purchaseOrderDetail.unit.id;
          unit.name = purchaseOrderDetail.unit.name;
          unit.symbol = purchaseOrderDetail.unit.symbol;
          const unitList:Array<Unit> =[];
          unitList.push(unit);
          this.unitArrayList.push(unitList);


        });
        console.log(this.grnItemFormArray);
      },err=>{
        console.error(err);
      })
    }
    
  }

  ngOnInit() {
    
  }

  public OnSubmit(index:number) {
    if((this.grnItemFormArray.controls[index]).valid) {
      // this.accordion.openAll();
      
    }
  }

}
