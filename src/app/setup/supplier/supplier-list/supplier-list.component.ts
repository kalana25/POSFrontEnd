import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { Supplier } from 'src/app/models/supplier';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/dialog-data'
import { DialogContentComponent } from '../../../shared/components/dialog-content/dialog-content.component';

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
    const dialogData = new DialogData();
    dialogData.dialogTitle ="Supplier Delete";
    dialogData.dialogContent = "Are you sure you want to delete this supplier ?";
    dialogData.buttonCancel = true;
    dialogData.buttonConfim = true;
    this.dialog.open(DialogContentComponent,
      {
        width:'500px',
        height: '180px',
        data:dialogData
      });
    
  }

  OnEdit(supplier) {
    console.log(supplier);
    
  }

}
