import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscountService } from 'src/app/setup/services/discount.service';
import { DiscountSave } from 'src/app/setup/models/discount-save';

@Component({
  selector: 'app-discount-edit',
  templateUrl: './discount-edit.component.html',
  styleUrls: ['./discount-edit.component.css']
})
export class DiscountEditComponent implements OnInit {
  discountForm:FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    protected fb:FormBuilder,
    protected dialog:MatDialog,
    protected route:ActivatedRoute,
    protected router:Router,
    protected snackBar:MatSnackBar,
    public dialogRef:MatDialogRef<DiscountEditComponent>,
    protected discountService:DiscountService
  ) { }

  ngOnInit() {
    this.initForm();
    this.discountService.getWithItemInfo(this.data.id)
    .subscribe(res=>{
      this.discountForm.setValue({
        id:res.id,
        itemName:res.item.name,
        itemId:res.item.id,
        rate:res.rate,
        startDate:res.startDate,
        endDate:res.endDate
      })
    },err=>{
      console.error(err);
    })
  }

  private initForm() {
    this.discountForm = this.fb.group({
      id:[''],
      itemName:['',Validators.required],
      itemId:['',Validators.required],
      rate:['',Validators.required],
      startDate:['',Validators.required],
      endDate:['',Validators.required]
    });
  }

  public OnUpdate() {
    if(this.discountForm.valid) {
      const model:DiscountSave = this.discountForm.value;
      this.discountService.update(this.data.id,model)
      .subscribe(res=>{
        this.dialogRef.close();
      },err=>{
        console.error(err);
      })
    }
  }

}
