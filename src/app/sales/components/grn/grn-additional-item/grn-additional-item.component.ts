import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { Product } from 'src/app/setup/models/product';
import { MeasurementService } from 'src/app/setup/services/measurement.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { PoDetailPickerComponent } from '../../po-detail-picker/po-detail-picker.component';
import { GrnItemExpansionPanelModel } from 'src/app/sales/models/grn-item-expansion-panel';
import { FormBuilder, Validators } from '@angular/forms';
import { Unit } from 'src/app/sales/models/unit';

@Component({
  selector: 'app-grn-additional-item',
  templateUrl: './grn-additional-item.component.html',
  styleUrls: ['./grn-additional-item.component.css']
})
export class GrnAdditionalItemComponent implements OnInit {

  public itemList:Array<GrnItemExpansionPanelModel>=[];
  public IsProceedVisible:boolean = false;
  @Output() public proceed = new EventEmitter<Array<GrnItemExpansionPanelModel>>();
  @Output() public skip = new EventEmitter<boolean>();

  constructor(
    private measurementService:MeasurementService,
    private snackBar:MatSnackBar,
    private dialog:MatDialog,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
  }

  public OnSelectProduct(product:Product) {

    this.measurementService.getByItem(product.id)
    .subscribe(mesRes=>{
      if(mesRes.length>0) {

        let dialogRef = this.dialog.open(PoDetailPickerComponent,
        {
          data:{'product':product,'measurement':mesRes},
          width:'230px'
        });

        dialogRef.afterClosed().subscribe(res=>{
          if(res) {

            const unit = new Unit();
            unit.id = res.unit.id;
            unit.name = res.unit.name;
            unit.symbol = res.unit.symbol;
            const unitList:Array<Unit> =[];
            unitList.push(unit);

            this.itemList.push (
              new GrnItemExpansionPanelModel(
                res,
                this.fb.group({
                  'expireDate':[''],
                  'quantity':[res.quantity,Validators.required],
                  'unitId':[res.unitId,Validators.required],
                  'purchasePrice':[res.unitPrice,Validators.required],
                  'sellingPrice':['',Validators.required]
                }),
                unitList,
                false,
                true)
            );
          }
        });

      } else {
        this.snackBar.open("Please configure the measurements","OK",{duration:2500});
      }
    }, err=>{
      console.error(err);      
    });

  }

  public OnSubmit(expansionPanelItem:GrnItemExpansionPanelModel) {
    if(expansionPanelItem.grnItemFormGroup.valid) {
      expansionPanelItem.isConfirmed = true;
      expansionPanelItem.expand = false;
      expansionPanelItem.purchasOrderDetail.quantity = expansionPanelItem.grnItemFormGroup.get('quantity').value;
      const index = this.itemList.findIndex(x=>!x.isConfirmed);
      if(index===-1)
        this.IsProceedVisible = true;
    }
  }

  public OnProceedClick() {
    this.proceed.emit(this.itemList);
  }

  public OnSkipClick() {
    this.skip.emit(true);
  }


  public OnExpansionPanelClosed(item:GrnItemExpansionPanelModel) {
    item.expand = false;
  }

  public OnExpansionPanelOpened(item:GrnItemExpansionPanelModel) {
    item.expand = true;
  }

}
