import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  constructor(
    public supplierService:SupplierService) { }

  ngOnInit() {
    this.supplierService.get()
  }

}
