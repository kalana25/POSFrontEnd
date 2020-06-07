import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { MeasurementService } from 'src/app/setup/services/measurement.service';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material';
import { MeasurementInfo } from 'src/app/setup/models/measurement-info';
import { BaseUnitService } from 'src/app/setup/services/base-unit.service';
import { BaseUnit } from 'src/app/setup/models/base-unit';
import { Measurement } from 'src/app/setup/models/measurement';

@Component({
  selector: 'app-measurement-edit',
  templateUrl: './measurement-edit.component.html',
  styleUrls: ['./measurement-edit.component.css']
})
export class MeasurementEditComponent implements OnInit {
  public measurementForm:FormGroup;
  public baseUnits:Array<BaseUnit>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data:MeasurementInfo,
    private fb:FormBuilder,
    private measurementService:MeasurementService,
    private baseUnitService:BaseUnitService,
    public dialogRef:MatDialogRef<MeasurementEditComponent>,
  ) { }

  ngOnInit() {
    this.GetBaseUnit();
    this.initForm();
    this.measurementService.get(this.data.id)
    .subscribe(res=>{
      this.measurementForm.setValue({
        id:res.id,
        name:res.name,
        symbol:res.symbol,
        quantity:res.quantity,
        comment:res.comment,
        baseUnitId:res.baseUnitId,
        itemId:res.itemId
      });
    },err=>{
      console.error(err);      
    })
  }

  private initForm() {
    this.measurementForm = this.fb.group({
      id:['',Validators.required],
      name:['',Validators.required],
      symbol:['',Validators.required],
      quantity:['',Validators.required],
      comment:[''],
      baseUnitId:['',Validators.required],
      itemId:['',Validators.required]
    });
  }

  private GetBaseUnit() {
    this.baseUnitService.get("findall")
    .subscribe(res=>{
      this.baseUnits = res;
    },err=>{
      console.error(err);
    })
  }

  private OnUpdate() {
    if(this.measurementForm.valid) {
      const model:Measurement = this.measurementForm.value;
      this.measurementService.update(this.data.id,model)
      .subscribe(res=>{
        this.dialogRef.close();
      },err=>{
        console.error(err);
      })
    }
  }

}
