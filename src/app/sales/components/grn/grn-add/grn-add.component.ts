import { Component, OnInit,ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { interval,pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-grn-add',
  templateUrl: './grn-add.component.html',
  styleUrls: ['./grn-add.component.css']
})
export class GrnAddComponent implements OnInit {

  constructor(
  ) { }
  public step_One_Completed:boolean= false;
  public step_Two_Completed:boolean = false;
  public grnHeaderForm:FormGroup;

  @ViewChild('stepper',{static:false}) private grnStepper:MatStepper;

  ngOnInit() {
  }

  public OnformSubmit(value:FormGroup) {
    if(value.valid) {
      this.grnHeaderForm = value;
      this.step_One_Completed= value.valid
      const observable = interval(100).pipe(take(1));
      observable.subscribe(res=>{
        console.info("Observable fired");    
        this.grnStepper.next();
      },err=>{
  
      },()=>{
        console.info("Observable completed");
      });  
    }
  }

}
