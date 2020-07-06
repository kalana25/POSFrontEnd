import { Component, OnInit,Input,OnChanges,ViewChild, ElementRef } from '@angular/core';
import { PurchaseOrderPagination } from 'src/app/sales/models/purchase-order-pagination';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { PurchaseOrderService } from 'src/app/sales/services/purchase-order.service';
import { PurchaseOrderDetailFullItem } from 'src/app/sales/models/purchase-order-detail-fullInfo';
import { FormArray } from '@angular/forms';
import { Unit } from 'src/app/sales/models/unit';
import { MatExpansionPanel, MatAccordion } from '@angular/material';
import { map } from 'rxjs/operators';
import { GrnItemExpansionPanelModel } from 'src/app/sales/models/grn-item-expansion-panel';

@Component({
  selector: 'app-grn-item',
  templateUrl: './grn-item.component.html',
  styleUrls: ['./grn-item.component.css']
})
export class GrnItemComponent implements OnInit,OnChanges {
  @Input() grnHeaderForm:FormGroup
  public IsItemLoading:boolean = false;
  public grnExpansionItemDetails:Array<GrnItemExpansionPanelModel>;

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
      .pipe(
        map(list=>{
          return list.map(elem=>{

            const unit = new Unit();
            unit.id = elem.unit.id;
            unit.name = elem.unit.name;
            unit.symbol = elem.unit.symbol;
            const unitList:Array<Unit> =[];
            unitList.push(unit);

            return new GrnItemExpansionPanelModel(
              elem,
              this.fb.group({
                'expireDate':[''],
                'quantity':[elem.quantity,Validators.required],
                'unitId':[elem.unitId,Validators.required],
                'purchasePrice':[elem.unitPrice,Validators.required],
                'sellingPrice':['',Validators.required]
              }),
              unitList,
              false,
              true);
          })
        })
      )
      .subscribe(res=>{
        this.IsItemLoading = false;
        this.grnExpansionItemDetails = res;
      },err=>{
        console.error(err);
      })
    }
    
  }

  ngOnInit() {
    
  }

  public OnSubmit(expansionPanelItem:GrnItemExpansionPanelModel) {
    if(expansionPanelItem.grnItemFormGroup.valid) {
      expansionPanelItem.isConfirmed = true;
      expansionPanelItem.expand = false;
      
    }
  }

  public OnExpansionPanelClosed(grnExpansionItem:GrnItemExpansionPanelModel) {
    grnExpansionItem.expand = false;  
  }

  public OnExpansionPanelOpened(grnExpansionItem:GrnItemExpansionPanelModel) {
    grnExpansionItem.expand = true;
  }

}
