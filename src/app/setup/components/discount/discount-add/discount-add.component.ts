import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { DiscountInfo } from 'src/app/setup/models/discount-info';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Product } from 'src/app/setup/models/product';
import { DiscountSave } from 'src/app/setup/models/discount-save';
import { DiscountService } from 'src/app/setup/services/discount.service';

@Component({
  selector: 'app-discount-add',
  templateUrl: './discount-add.component.html',
  styleUrls: ['./discount-add.component.css']
})
export class DiscountAddComponent implements OnInit {

  public discountForm:FormGroup;
  private isItemSelected:boolean;


  constructor(
    protected fb:FormBuilder,
    protected dialog:MatDialog,
    protected route:ActivatedRoute,
    protected router:Router,
    protected snackBar:MatSnackBar,
    protected discountService:DiscountService
  ) { }

  ngOnInit() {
    this.initForm();
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

  public OnSelectProduct(product:Product) {
    this.discountForm.get('itemName').patchValue(product.name);
    this.discountForm.get('itemId').patchValue(product.id);
    this.isItemSelected = true;
  }

  public OnGoBack() {
    this.router.navigate(['../discount-list'],{relativeTo:this.route});
  }

  public OnSave() {

    if(!this.isItemSelected) {
      this.snackBar.open("Please select the item for discount","OK",{duration:2500});
    } else {
      if(this.discountForm.valid){
        let model:DiscountSave = this.discountForm.value;
        this.discountService.add(model)
        .subscribe(res=>{
          this.router.navigate(['../discount-list'],{relativeTo:this.route});
        },err=>{
          console.error(err);
        })
      }
    }

  }

}
