import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.css']
})
export class OrderCartComponent implements OnInit {
  @Input() nextCode:string;
  cashier:string ="mypos@homail.com"
  constructor() { }

  ngOnInit() {
  }

}
