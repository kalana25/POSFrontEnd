import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Product } from 'src/app/setup/models/product';
import { BaseUnit } from 'src/app/setup/models/base-unit';
import { BaseUnitService } from 'src/app/setup/services/base-unit.service';

@Component({
  selector: 'app-base-unit-add',
  templateUrl: './base-unit-add.component.html',
  styleUrls: ['./base-unit-add.component.css']
})
export class BaseUnitAddComponent implements OnInit {

  public baseUnitForm:FormGroup;

  constructor(
    protected fb:FormBuilder,
    protected dialog:MatDialog,
    protected route:ActivatedRoute,
    protected router:Router,
    protected snackBar:MatSnackBar,
    protected baseUnitService:BaseUnitService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.baseUnitForm = this.fb.group({
      name:['',Validators.required],
      description:[''],
      symbol:['',Validators.required]
    });
  }

  public OnGoBack() {
    this.router.navigate(['../base-unit-list'],{relativeTo:this.route});
  }

  public OnSave() {
    if(this.baseUnitForm.valid){
      let model:BaseUnit = this.baseUnitForm.value;
      this.baseUnitService.add(model)
      .subscribe(res=>{
        this.router.navigate(['../base-unit-list'],{relativeTo:this.route});
      },err=>{
        console.error(err);
      })
    }
  }



}
