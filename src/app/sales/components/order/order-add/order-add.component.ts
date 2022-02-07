import { Component, OnInit } from '@angular/core';
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
  rotState:string ="start"

  selectedCategory:Category;

  constructor() { }

  ngOnInit() {
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
