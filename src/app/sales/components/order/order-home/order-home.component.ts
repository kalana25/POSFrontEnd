import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-home',
  templateUrl: './order-home.component.html',
  styleUrls: ['./order-home.component.css']
})
export class OrderHomeComponent implements OnInit {
  rippleColor:string;
  
  constructor(
    protected route:ActivatedRoute,
    protected router:Router) { }

  ngOnInit() {
  }

  public OnAddOrder() {
    this.router.navigate(['../sales-home-new'],{relativeTo:this.route});
  }

}
