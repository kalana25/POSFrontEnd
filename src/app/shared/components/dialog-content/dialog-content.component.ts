import { Component, OnInit,Inject } from '@angular/core';
import { DialogData } from 'src/app/core/dialog-data';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnInit {
  
  constructor(
    public dialogRef:MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData
  ) { }

  ngOnInit() {
  }

  OnCancel() {
    this.dialogRef.close();
  }

}
