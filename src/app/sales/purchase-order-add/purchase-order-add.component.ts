import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-order-add',
  templateUrl: './purchase-order-add.component.html',
  styleUrls: ['./purchase-order-add.component.css']
})
export class PurchaseOrderAddComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public OnSelectProduct(product) {
    console.log(product);
    
  }

}
