import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-purchase-order-header',
  templateUrl: './purchase-order-header.component.html',
  styleUrls: ['./purchase-order-header.component.css']
})
export class PurchaseOrderHeaderComponent implements OnInit {
  purchaseOrderHeader:FormGroup;

  constructor(
    public fb:FormBuilder
  ) { 

  }

  ngOnInit() {
    this.purchaseOrderHeader = this.fb.group({
      date:[null,Validators.required],
      code:['',Validators.required],
      userId:[0,],
      totalPrice:[0,Validators.required]
    });
  }

}
