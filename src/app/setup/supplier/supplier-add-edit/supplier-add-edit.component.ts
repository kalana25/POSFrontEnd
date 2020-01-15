import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Supplier } from 'src/app/models/supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import { Router } from '@angular/router';
import { noTwoWhiteSpacesValidator,numbersValidator } from 'src/app/shared/Validations/common-validation'

@Component({
  selector: 'app-supplier-add-edit',
  templateUrl: './supplier-add-edit.component.html',
  styleUrls: ['./supplier-add-edit.component.css']
})
export class SupplierAddEditComponent implements OnInit {

  public supplierFormGroup:FormGroup;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private supplierService:SupplierService
  ) { 

  }

  private initForm() {
    this.supplierFormGroup = this.fb.group({
      'Code':['',Validators.required],
      'Name':['',Validators.required],
      'Description':[''],
      'ContactNo':['',[Validators.maxLength(10)]],
      'Telephone':['',[Validators.maxLength(10)]],
      'Email':['',Validators.email],
      'Comment':[''],
      'BlackList':[false],
      'Active':[true]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  OnSubmit() {
    if(this.supplierFormGroup.valid) {
      this.SaveSupplier(this.supplierFormGroup.value);
    }
  }

  SaveSupplier(supplier:Supplier) {
    this.supplierService.add(supplier)
    .subscribe(res=>{
      this.router.navigate(['/supplier-list']);
    },err=>{
      console.error(err);
    })
  }

}
