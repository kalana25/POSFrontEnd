import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pick-quantity',
  templateUrl: './pick-quantity.component.html',
  styleUrls: ['./pick-quantity.component.css']
})
export class PickQuantityComponent implements OnInit {

  constructor(
    private dialogRef:MatDialogRef<PickQuantityComponent>
  ) { }

  ngOnInit() {
  }

  public OnCancel() {
    this.dialogRef.close();
  }

}
