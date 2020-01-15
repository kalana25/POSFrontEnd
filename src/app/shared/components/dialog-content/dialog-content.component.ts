import { Component, OnInit,Inject } from '@angular/core';
import { DialogData } from 'src/app/core/dialog-data';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { fromEvent } from 'rxjs';
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
    const button = document.getElementById('dialogConfirm') as HTMLElement;
    fromEvent(button,'click').subscribe( _=> {
      this.data.action.Execute()
      .subscribe( _=> {
        this.dialogRef.close();
      }, err=> {
        console.log(err);
      });
    })
  }

  OnCancel() {
    this.dialogRef.close();
  }

}
