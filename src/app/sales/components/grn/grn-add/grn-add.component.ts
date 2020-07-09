import { Component, OnInit,ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { interval,pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { GrnItemExpansionPanelModel } from 'src/app/sales/models/grn-item-expansion-panel';

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
  public step_Three_Completed:boolean = false;
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

  public OnGrnItemsSubmit(value:Array<GrnItemExpansionPanelModel>) {
    this.step_Two_Completed = true;
    const observable = interval(100).pipe(take(1));
    observable.subscribe(res=>{
      console.info("Observable 2 fired");    
      this.grnStepper.next();
    },err=>{

    },()=>{
      console.info("Observable 2 completed");
    });  
  }

  public OnAdditionalGrnItemSubmit(value:Array<GrnItemExpansionPanelModel>) {
    this.step_Three_Completed = true;
    const observable = interval(100).pipe(take(1));
    observable.subscribe(res=>{
      console.info("Observable 3 fired");    
      this.grnStepper.next();
    },err=>{

    },()=>{
      console.info("Observable 3 completed");
    }); 
  }

  public OnSkip() {
    this.step_Three_Completed = true;
    const observable = interval(100).pipe(take(1));
    observable.subscribe(res=>{
      console.info("Observable 3 fired");    
      this.grnStepper.next();
    },err=>{

    },()=>{
      console.info("Observable 3 completed");
    }); 
  }

}
