import { Component, OnInit,Input,OnChanges,Output,ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { PurchaseOrderPagination } from 'src/app/sales/models/purchase-order-pagination';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { PurchaseOrderService } from 'src/app/sales/services/purchase-order.service';
import { PurchaseOrderDetailFullItem } from 'src/app/sales/models/purchase-order-detail-fullInfo';
import { FormArray } from '@angular/forms';
import { Unit } from 'src/app/sales/models/unit';
import { MatExpansionPanel, MatAccordion } from '@angular/material';
import { Subject } from 'rxjs';
import { map, distinctUntilChanged, debounceTime,takeUntil } from 'rxjs/operators';
import { GrnItemExpansionPanelModel, ProfitSetterInfoModel } from 'src/app/sales/models/grn-item-expansion-panel';

@Component({
  selector: 'app-grn-item',
  templateUrl: './grn-item.component.html',
  styleUrls: ['./grn-item.component.css']
})
export class GrnItemComponent implements OnInit,OnChanges,OnDestroy {
  @Input() grnHeaderForm:FormGroup;
  @Output() public grnExpansionPanelItemsSubmit = new EventEmitter<Array<GrnItemExpansionPanelModel>>();

  public IsItemLoading:boolean = false;
  public grnExpansionItemDetails:Array<GrnItemExpansionPanelModel>;
  public IsProceedVisible:boolean = false;

  @ViewChild('accordion',{static:false}) private accordion:MatAccordion;

  private destroy$ = new Subject();

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

            //Profit Calibration
            const profitSetting = new ProfitSetterInfoModel();
            if(elem.isBaseUnit) {
              profitSetting.orderedAmountText = `${elem.quantity} ${elem.unit.name}`;
              profitSetting.purchasePricePerUnit = elem.unitPrice;
            } else {
              const unit:any = elem.unit;
              profitSetting.orderedAmountText = `${elem.quantity} ${elem.unit.name} (${unit.quantity} ${unit.baseUnitName})`;
              profitSetting.purchasePricePerUnit = elem.unitPrice/unit.quantity;
            }
            profitSetting.sellingPricePerUnit = profitSetting.purchasePricePerUnit;
            profitSetting.profit = profitSetting.sellingPricePerUnit - profitSetting.purchasePricePerUnit;


            return new GrnItemExpansionPanelModel(
              elem,
              this.fb.group({
                'expireDate':[''], 
                'quantity':[elem.quantity,Validators.required],
                'unitId':[elem.unitId,Validators.required],
                'purchasePrice':[elem.unitPrice,Validators.required],
                'sellingPrice':[elem.unitPrice,Validators.required]
              }),
              unitList,
              false,
              true,
              profitSetting);
          })
        })
      )
      .subscribe(res=>{
        this.IsItemLoading = false;
        this.grnExpansionItemDetails = res;
        this.SubscribeToObservable();
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
      expansionPanelItem.purchasOrderDetail.quantity = Number(expansionPanelItem.grnItemFormGroup.get('quantity').value);
      const index = this.grnExpansionItemDetails.findIndex(x=>!x.isConfirmed);
      if(index===-1)
        this.IsProceedVisible = true;
    }
  }

  public OnExpansionPanelClosed(grnExpansionItem:GrnItemExpansionPanelModel) {
    grnExpansionItem.expand = false;  
  }

  public OnExpansionPanelOpened(grnExpansionItem:GrnItemExpansionPanelModel) {
    grnExpansionItem.expand = true;
  }

  public OnProceedClick() {
    this.grnExpansionPanelItemsSubmit.emit(this.grnExpansionItemDetails);
  }

  private SubscribeToObservable() {
    this.grnExpansionItemDetails.forEach(expansionItem => {

      //quantity value changes.
      expansionItem.grnItemFormGroup.get('quantity').valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(quantity=>{
        const unit:any =  expansionItem.purchasOrderDetail.unit;
        if(expansionItem.purchasOrderDetail.isBaseUnit) {
          expansionItem.profitSetting.orderedAmountText =  `${quantity} ${unit.name}`;
        } else {
          expansionItem.profitSetting.orderedAmountText = `${quantity} ${unit.name} (${unit.quantity} ${unit.baseUnitName})`;
        }
      },err=>{
        console.error(err);
      },()=>{
        console.info('quantity $ completed');
      });

      //selling price value changes.
      expansionItem.grnItemFormGroup.get('sellingPrice').valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(selprice=>{
        if(expansionItem.purchasOrderDetail.isBaseUnit) {
          expansionItem.profitSetting.sellingPricePerUnit = selprice;
        } else {
          const unit:any =  expansionItem.purchasOrderDetail.unit;
          expansionItem.profitSetting.sellingPricePerUnit = selprice/unit.quantity;
        }
        expansionItem.profitSetting.profit = expansionItem.profitSetting.sellingPricePerUnit-expansionItem.profitSetting.purchasePricePerUnit;
      },err=>{
        console.error(err);
      },()=>{
        console.info('selling price $ completed');
      })

      //purchase price value changes.
      expansionItem.grnItemFormGroup.get('purchasePrice').valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(purPrice=>{
        const unit:any =  expansionItem.purchasOrderDetail.unit;
        if(expansionItem.purchasOrderDetail.isBaseUnit) {
          expansionItem.profitSetting.purchasePricePerUnit = purPrice;
        } else {
          expansionItem.profitSetting.purchasePricePerUnit = purPrice/unit.quantity;
        }
        expansionItem.grnItemFormGroup.get('sellingPrice').setValue(purPrice);
      },err=>{
        console.error(err);
      },()=>{
        console.info('purchase price $ completed');
      })


    });
  }

  //Warning this manipulate profit value , as selling price value changes it also again chaning profit.
  public OnInput(value,grnExpansionItem:GrnItemExpansionPanelModel) {
    grnExpansionItem.profitSetting.profit = value.value;
    grnExpansionItem.profitSetting.sellingPricePerUnit = grnExpansionItem.profitSetting.profit + grnExpansionItem.profitSetting.purchasePricePerUnit;
    if(grnExpansionItem.purchasOrderDetail.isBaseUnit) {
      grnExpansionItem.grnItemFormGroup.get('sellingPrice').setValue(grnExpansionItem.profitSetting.sellingPricePerUnit);
    } else {
      const unit:any =  grnExpansionItem.purchasOrderDetail.unit;
      grnExpansionItem.grnItemFormGroup.get('sellingPrice').setValue(grnExpansionItem.profitSetting.sellingPricePerUnit*unit.quantity);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
