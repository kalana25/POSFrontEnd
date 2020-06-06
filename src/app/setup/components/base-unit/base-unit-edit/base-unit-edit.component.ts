import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseUnitService } from 'src/app/setup/services/base-unit.service';
import { BaseUnit } from 'src/app/setup/models/base-unit';

@Component({
  selector: 'app-base-unit-edit',
  templateUrl: './base-unit-edit.component.html',
  styleUrls: ['./base-unit-edit.component.css']
})
export class BaseUnitEditComponent implements OnInit {

  baseUnitForm:FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    protected fb:FormBuilder,
    protected dialog:MatDialog,
    protected route:ActivatedRoute,
    protected router:Router,
    protected snackBar:MatSnackBar,
    public dialogRef:MatDialogRef<BaseUnitEditComponent>,
    protected baseUnitService:BaseUnitService
  ) { }


  ngOnInit() {
    this.initForm();

    this.baseUnitForm.setValue({
      id:this.data.id,
      name:this.data.name,
      description:this.data.description,
      symbol:this.data.symbol
    });
  }

  private initForm() {
    this.baseUnitForm = this.fb.group({
      id:['',Validators.required],
      name:['',Validators.required],
      description:[''],
      symbol:['',Validators.required]
    });
  }

  private OnUpdate() {
    if(this.baseUnitForm.valid) {
      const model:BaseUnit = this.baseUnitForm.value;
      this.baseUnitService.update(model)
      .subscribe(res=>{
        this.dialogRef.close();
      },err=>{
        console.error(err);
      })
    }
  }

}
