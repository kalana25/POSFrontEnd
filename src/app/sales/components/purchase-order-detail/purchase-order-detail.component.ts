import { Component, OnInit,Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-purchase-order-detail',
  templateUrl: './purchase-order-detail.component.html',
  styleUrls: ['./purchase-order-detail.component.css']
})
export class PurchaseOrderDetailComponent implements OnInit {

  @Input()ProductList:Array<Product>
  
  constructor() { }

  ngOnInit() {
  }

}
