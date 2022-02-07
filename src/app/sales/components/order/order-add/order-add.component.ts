import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/setup/models/category';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  selectedCategory:Category;

  constructor() { }

  ngOnInit() {
  }

  public OnCategoryOutput(input:Category)
  {
    this.selectedCategory = input;
  }

}
