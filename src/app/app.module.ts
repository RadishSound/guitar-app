import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuitarTunerComponent } from './guitar-tuner/guitar-tuner.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import{ BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    GuitarTunerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
