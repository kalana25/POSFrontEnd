import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Product } from 'src/app/setup/models/product';
import { BaseUnitService } from 'src/app/setup/services/base-unit.service';
import { MeasurementService } from 'src/app/setup/services/measurement.service';
import { BaseUnit } from 'src/app/setup/models/base-unit';
import { Measurement } from 'src/app/setup/models/measurement';

@Component({
  selector: 'app-measurement-add',
  templateUrl: './measurement-add.component.html',
  styleUrls: ['./measurement-add.component.css']
})
export class MeasurementAddComponent implements OnInit {
  private item:Product
  public measurementForm:FormGroup;
  public baseUnits:Array<BaseUnit>;

  constructor(
    public route:ActivatedRoute,
    public router:Router,
    protected fb:FormBuilder,
    protected baseUnitService:BaseUnitService,
    protected measurementService:MeasurementService
  ) { }

  ngOnInit() {
    this.initForm();
    this.item = this.route.snapshot.params as Product;
    this.measurementForm.get('itemId').patchValue(Number(this.item.id));
    this.GetBaseUnit();
  }

  private initForm() {
    this.measurementForm = this.fb.group({
      name:['',Validators.required],
      symbol:['',Validators.required],
      quantity:['',Validators.required],
      comment:[''],
      baseUnitId:['',Validators.required],
      itemId:['',Validators.required]
    });
  }

  public OnGoBack() {
    this.router.navigate(['../measurement-list',this.item],{relativeTo:this.route});
  }

  private GetBaseUnit() {
    this.baseUnitService.get("findall")
    .subscribe(res=>{
      this.baseUnits = res;
    },err=>{
      console.error(err);
    })
  }

  public OnSave() {
    if(this.measurementForm.valid){
      let model:Measurement = this.measurementForm.value;
      this.measurementService.add(model)
      .subscribe(res=>{
        this.router.navigate(['../measurement-list',this.item],{relativeTo:this.route});
      },err=>{
        console.error(err);
      })
    }
  }

}
