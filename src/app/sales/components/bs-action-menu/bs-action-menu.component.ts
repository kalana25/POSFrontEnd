import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bs-action-menu',
  templateUrl: './bs-action-menu.component.html',
  styleUrls: ['./bs-action-menu.component.css']
})
export class BsActionMenuComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  public OnEditHeader() {
    this.router.navigate(['purchase-order-edit-header']);
  }

  public OnEditItems() {
    this.router.navigate(['purchase-order-edit-detail']);
  }

}
