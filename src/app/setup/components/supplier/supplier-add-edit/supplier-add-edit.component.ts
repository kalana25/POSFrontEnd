import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Supplier } from '../../../models/supplier';
import { SupplierService } from '../../../services/supplier.service';
import { Router, ActivatedRoute } from '@angular/router';
import { noTwoWhiteSpacesValidator,numbersValidator } from 'src/app/shared/Validations/common-validation'
import { ToastrService } from 'ngx-toastr';

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
    private route:ActivatedRoute,
    private toasterService:ToastrService,
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
    this.getNextSupplierCode();
  }

  OnSubmit() {
    if(this.supplierFormGroup.valid) {
      this.SaveSupplier(this.supplierFormGroup.value);
    }
  }

  SaveSupplier(supplier:Supplier) {
    this.supplierService.add(supplier)
    .subscribe(res=>{
      this.router.navigate(['../supplier-list'],{relativeTo:this.route});
    },err=>{
      this.toasterService.error("Please check the internet connection","Something Bad happen")
      console.error(err);
    })
  }

  private getNextSupplierCode() {
    this.supplierService.getNextSupplierCode()
    .subscribe(res=>{
      if(res.code) {
        this.supplierFormGroup.get('Code').patchValue(res.code);
      }
    },err=>{
      this.toasterService.error("Please check the internet connection","Something Bad happen")
      console.error(err);
    })
  }

}
