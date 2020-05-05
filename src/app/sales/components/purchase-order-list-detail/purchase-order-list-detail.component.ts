import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-purchase-order-list-detail',
  templateUrl: './purchase-order-list-detail.component.html',
  styleUrls: ['./purchase-order-list-detail.component.css']
})
export class PurchaseOrderListDetailComponent implements OnInit {
  id:string;
  constructor(
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.id= this.route.snapshot.paramMap.get('id');
  }

}
