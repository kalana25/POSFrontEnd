import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-supplier-add-edit',
  templateUrl: './supplier-add-edit.component.html',
  styleUrls: ['./supplier-add-edit.component.css']
})
export class SupplierAddEditComponent implements OnInit {

  supplierFormGroup:FormGroup;

  constructor(
    private fb:FormBuilder
  ) { 

  }

  private initForm() {
    this.supplierFormGroup = this.fb.group({
      'Code':['',Validators.required],
      'Name':['',Validators.required],
      'Description':[''],
      'ContactNo':[''],
      'Telephone':[''],
      'Email':[''],
      'Comment':[''],
      'BlackList':[''],
      'Active':['']
    });
  }

  ngOnInit() {
    this.initForm();
  }

}
