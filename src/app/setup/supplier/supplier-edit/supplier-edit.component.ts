import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Supplier } from 'src/app/models/supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/core/dialog-data';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { noTwoWhiteSpacesValidator,numbersValidator } from 'src/app/shared/Validations/common-validation'

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {

  public supplierFormGroup:FormGroup;

  constructor(    
    private fb:FormBuilder,
    public dialogRef:MatDialogRef<SupplierEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private supplierService:SupplierService) { }

  ngOnInit() {
    this.initForm();
    this.setFormValues();
  }

  OnCancel() {
    this.dialogRef.close();
  }

  private initForm() {
    this.supplierFormGroup = this.fb.group({
      'id':['',Validators.required],
      'code':['',Validators.required],
      'name':['',Validators.required],
      'description':[''],
      'contactNo':['',[Validators.maxLength(10)]],
      'telephone':['',[Validators.maxLength(10)]],
      'email':['',Validators.email],
      'comment':[''],
      'blackList':[false],
      'active':[true]
    });
  }

  private setFormValues() {
    this.supplierFormGroup.setValue({
      'id':this.data.id,
      'code':this.data.code,
      'name':this.data.name,
      'description':this.data.description,
      'contactNo':this.data.contactNo,
      'telephone':this.data.telephone,
      'email':this.data.email,
      'comment':this.data.comment,
      'blackList':this.data.blackList,
      'active':this.data.active
    });
  }

  public OnSubmit() {
    if(this.supplierFormGroup.valid) {
      this.supplierService.update(this.supplierFormGroup.value)
      .subscribe(res=>{
        this.dialogRef.close();
      },err=>{
        console.error(err);
      })
    }
  }

}
