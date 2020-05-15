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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { httpInterceptorProviders } from './providers/interceptor-provider';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    DialogContentComponent, 
    HeaderComponent, 
    ItemPickerComponent, 
    HomePageComponent, PageNotFoundComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    AngularMaterialModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    DialogContentComponent,
    HeaderComponent,
    AngularFontAwesomeModule,
    ItemPickerComponent,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[
    httpInterceptorProviders
  ],
  entryComponents:[DialogContentComponent]
})
export class SharedModule { }
