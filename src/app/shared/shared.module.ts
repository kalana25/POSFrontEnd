import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { noTwoWhiteSpacesValidator,numbersValidator} from 'src/app/shared/Validations/common-validation'
import { HeaderComponent } from './components/header/header.component';
import { AngularMaterialModule } from '../angular-material.module';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ItemPickerComponent } from './components/item-picker/item-picker.component';


@NgModule({
  declarations: [
    DialogContentComponent, 
    HeaderComponent, 
    ItemPickerComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    AngularMaterialModule,
    AngularFontAwesomeModule
  ],
  exports:[
    DialogContentComponent,
    HeaderComponent,
    AngularFontAwesomeModule
  ],
  entryComponents:[DialogContentComponent]
})
export class SharedModule { }
