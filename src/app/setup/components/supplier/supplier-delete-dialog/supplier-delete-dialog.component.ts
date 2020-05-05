import { Component, OnInit,Inject } from '@angular/core';
import { DialogData } from 'src/app/core/dialog-data';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SupplierService } from 'src/app/services/supplier.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-supplier-delete-dialog',
  templateUrl: './supplier-delete-dialog.component.html',
  styleUrls: ['./supplier-delete-dialog.component.css']
})
export class SupplierDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef:MatDialogRef<SupplierDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
    public supplierService:SupplierService
  ) { }

  ngOnInit() {
  }

  OnConfirm() {
    console.log(this.data);
    this.supplierService.delete(Number(this.data))
    .subscribe(res=>{
      this.dialogRef.close();
    },err=>{
      console.log(err);
    })
  }


  OnCancel() {
    this.dialogRef.close();
  }

}
