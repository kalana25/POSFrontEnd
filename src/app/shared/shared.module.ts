import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [DialogContentComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    
  ],
  exports:[
    DialogContentComponent
  ],
  entryComponents:[DialogContentComponent]
})
export class SharedModule { }
