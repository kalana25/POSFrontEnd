import { Component, OnInit,ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { interval,pipe } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-grn-add',
  templateUrl: './grn-add.component.html',
  styleUrls: ['./grn-add.component.css']
})
export class GrnAddComponent implements OnInit {

  constructor(
  ) { }
  public step_One_Completed:boolean= false;
  @ViewChild('stepper',{static:false}) private grnStepper:MatStepper;

  ngOnInit() {
  }

  public OnFormOneValid(value) {
    this.step_One_Completed= value;

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
