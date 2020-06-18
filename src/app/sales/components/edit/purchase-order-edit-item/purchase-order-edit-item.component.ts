import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseOrderDetailFullItem } from 'src/app/sales/models/purchase-order-detail-fullInfo';
import { FormControl,FormGroup,FormBuilder, Validators } from '@angular/forms';
import { BaseUnitService } from 'src/app/setup/services/base-unit.service';
import { BaseUnit } from 'src/app/setup/models/base-unit';
import { MeasurementWithBaseUnit } from 'src/app/setup/models/measurement-with-baseunit';

@Component({
  selector: 'app-purchase-order-edit-item',
  templateUrl: './purchase-order-edit-item.component.html',
  styleUrls: ['./purchase-order-edit-item.component.css']
})
export class PurchaseOrderEditItemComponent implements OnInit {

  public itemEditFormGroup:FormGroup;
  baseUnits:Array<BaseUnit>;
  measurements:Array<MeasurementWithBaseUnit>;
  IsBaseUnit:boolean;
  
  constructor(
    protected fb:FormBuilder,
    private baseUnitService:BaseUnitService,
    protected dialogRef:MatDialogRef<PurchaseOrderEditItemComponent>,
    @Inject(MAT_DIALOG_DATA) protected data:{'poItem':PurchaseOrderDetailFullItem,'measurement':Array<MeasurementWithBaseUnit>},
  ) { }

  ngOnInit() {
    this.initForm();
    this.patchValue();
    this.loadBaseUnits();
    this.measurements = this.data.measurement;
  }

  public OnCancel() {
    this.dialogRef.close(undefined);
  }

  public OnConfirm() {
    if(this.itemEditFormGroup.valid) {
      this.data.poItem.quantity =this.itemEditFormGroup.get('quantity').value;
      this.data.poItem.unitId = this.itemEditFormGroup.get('unitId').value;
      this.data.poItem.isBaseUnit = this.itemEditFormGroup.get('isBaseUnit').value;
      this.data.poItem.unitPrice = this.itemEditFormGroup.get('unitPrice').value;
      if(this.data.poItem.isBaseUnit) {
        this.data.poItem.unit = this.baseUnits.find(x=>x.id == this.data.poItem.unitId);
      } else {
        this.data.poItem.unit = this.measurements.find(x=>x.id == this.data.poItem.unitId);
      }
      this.dialogRef.close(this.data);
    }
  }

  private initForm() {
    this.itemEditFormGroup = this.fb.group({
      quantity:['',Validators.required],
      unitId:['',Validators.required],
      unitPrice:['',Validators.required],
      isBaseUnit:[false]
    })
  }

  private patchValue() {
    this.itemEditFormGroup.setValue({
      quantity:this.data.poItem.quantity,
      unitId:this.data.poItem.unitId,
      unitPrice:this.data.poItem.unitPrice,
      isBaseUnit:this.data.poItem.isBaseUnit
    });
    this.IsBaseUnit = this.data.poItem.isBaseUnit;
  }

  public checkChange(value) {
    if(value.checked) {
      this.IsBaseUnit= true;
    } else {
      this.IsBaseUnit= false;
    }
  }

  private loadBaseUnits() {
    this.baseUnitService.get("findall")
    .subscribe(res=>{
      this.baseUnits = res;
    },err=>{
      console.error(err);      
    })
  }

}
