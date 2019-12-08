import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SetupModule } from './setup/setup.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SetupModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
