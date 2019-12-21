import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { Supplier } from 'src/app/models/supplier';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  supplierList:Array<Supplier>;

  constructor(
    public supplierService:SupplierService) { }

  ngOnInit() {
    const endPoint = "findall"
    this.supplierService.get(endPoint)
    .subscribe(res=>{
      this.supplierList = res;
    })
  }

}
