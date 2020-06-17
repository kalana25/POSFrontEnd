import { Component, OnInit,Inject } from '@angular/core';
import { PurchaseOrderDetailWithItem } from '../../models/purchase-order-detail-withItem';
import { Product } from '../../../setup/models/product';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeasurementWithBaseUnit } from 'src/app/setup/models/measurement-with-baseunit';
import { MatCheckboxClickAction } from '@angular/material';
import { BaseUnit } from 'src/app/setup/models/base-unit';
import { BaseUnitService } from 'src/app/setup/services/base-unit.service';

@Component({
  selector: 'app-po-detail-picker',
  templateUrl: './po-detail-picker.component.html',
  styleUrls: ['./po-detail-picker.component.css']
})
export class PoDetailPickerComponent implements OnInit {

  model:PurchaseOrderDetailWithItem;
  measurements:Array<MeasurementWithBaseUnit>;
  baseUnits:Array<BaseUnit>;
  poDetailPickerFormGroup:FormGroup;
  IsBaseUnit:boolean=false;

  constructor(
    private fb:FormBuilder,
    private baseUnitService:BaseUnitService,
    public dialogRef:MatDialogRef<PoDetailPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{product:Product,measurement:Array<MeasurementWithBaseUnit>},
  ) { }

  ngOnInit() {
    this.initFormGroup();
    this.model = new PurchaseOrderDetailWithItem;
    this.measurements = this.data.measurement;
    this.loadBaseUnits();
  }

  public OnCancel() {
    this.dialogRef.close(undefined);
  }

  public OnConfirm() {

    if(this.poDetailPickerFormGroup.valid) {
      this.model.unitPrice = this.poDetailPickerFormGroup.get('unitPrice').value;
      this.model.unitId = this.poDetailPickerFormGroup.get('unitId').value;
      this.model.isBaseUnit = this.poDetailPickerFormGroup.get('isBaseUnit').value;
      this.model.itemId = this.data.product.id;
      this.model.quantity = Number(this.poDetailPickerFormGroup.get('quantity').value);
      this.model.item = this.data.product;
      this.dialogRef.close(this.model);
    }

  }

  private initFormGroup() {
    this.poDetailPickerFormGroup = this.fb.group({
      quantity:['',Validators.required],
      unitId:['',Validators.required],
      unitPrice:['',Validators.required],
      isBaseUnit:[false]
    });
  }

  public checkChange(value) {
    if(value.checked) {
      this.IsBaseUnit = true;
    } else {
      this.IsBaseUnit = false;
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
