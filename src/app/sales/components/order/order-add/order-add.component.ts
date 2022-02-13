import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/sales/services/order.service';
import { Category } from 'src/app/setup/models/category';
import { Product } from 'src/app/setup/models/product';
import { fade, rotateAll, rotateAndHide, cartslide } from '../../../../core/application-animation'

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css'],
  animations:[    
    rotateAll,
    cartslide,
    rotateAndHide]
})
export class OrderAddComponent implements OnInit {
  public nextOrderCode:string;
  rotState:string ="start"

  selectedCategory:Category;

  constructor(
    private orderService:OrderService,
    private toasterService:ToastrService
  ) { }

  ngOnInit() {
    this.orderService.getNextCode()
    .subscribe(res=>{
      this.nextOrderCode = res.code;
    },err=>{
      this.toasterService.error("Please check the internet connection","Something Bad happen")
    })
  }

  public OnCategoryOutput(input:Category)
  {
    this.selectedCategory = input;
  }

  public OnProductSelect(input:Product) {
    console.log(input);
    this.rotState = this.rotState==="start" ? "end":"start"
  }

}
