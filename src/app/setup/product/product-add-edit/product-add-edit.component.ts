import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { DropdownItem } from 'src/app/core/dropdown-item';
import { map} from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent implements OnInit {

  prouctFormGroup:FormGroup;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private productService:ProductService
  ) { 

  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.prouctFormGroup = this.fb.group({
      'Code':['',Validators.required],
      'Name':['',Validators.required],
      'CategoryId':['',Validators.required],
      'Price':[''],
      'Barcode':[''],
      'Active':[true]
    });
  }

}
