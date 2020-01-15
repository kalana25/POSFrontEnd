import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { Supplier } from 'src/app/models/supplier';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/dialog-data'
import { SupplierDeleteDialogComponent } from '../supplier-delete-dialog/supplier-delete-dialog.component';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  supplierList:Array<Supplier>;
  IsLoading:boolean = false;

  constructor(
    public supplierService:SupplierService,
    private router:Router,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.LoadSupplierList();
  }

  private LoadSupplierList() {
    this.IsLoading = true;
    const endPoint = "findall"
    this.supplierService.get(endPoint)
    .subscribe(res=>{
      this.IsLoading = false;
      this.supplierList = res;
    })
  }

  OnAddClick() {
    console.log(this.supplierList);
    
    this.router.navigate(['/supplier-new'])
  }

  OnDelete(id:number) {
    let dialogRef = this.dialog.open(SupplierDeleteDialogComponent,
      {
        width:'500px',
        height: '180px',
        data:id
      });
    dialogRef.afterClosed().subscribe(res=>{
      this.LoadSupplierList();
    })
  }

  OnEdit(supplier) {
    console.log(supplier);
    
  }

}
