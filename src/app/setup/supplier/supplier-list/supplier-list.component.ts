import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { Supplier } from 'src/app/models/supplier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  supplierList:Array<Supplier>;

  constructor(
    public supplierService:SupplierService,
    private router:Router) { }

  ngOnInit() {
    const endPoint = "findall"
    this.supplierService.get(endPoint)
    .subscribe(res=>{
      this.supplierList = res;
    })
  }

  OnAddClick() {
    this.router.navigate(['/supplier-new'])
  }

  OnDelete(id:number) {
    console.log(id);
    
  }

  OnEdit(supplier) {
    console.log(supplier);
    
  }

}
