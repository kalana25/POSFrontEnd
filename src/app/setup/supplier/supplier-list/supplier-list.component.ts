import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { Supplier } from 'src/app/models/supplier';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  supplierList:Array<Supplier>;

  constructor(
    public supplierService:SupplierService,
    private router:Router,
    private dialog:MatDialog) { }

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
    //this.dialog.open()
    
  }

  OnEdit(supplier) {
    console.log(supplier);
    
  }

}
