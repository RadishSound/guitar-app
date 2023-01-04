import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuitarTunerComponent } from './guitar-tuner/guitar-tuner.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import{ BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { TuningSettingsComponent } from './tuning-settings/tuning-settings.component';
import { LearningIntervalComponent } from './learning-interval/learning-interval.component';




@NgModule({
  declarations: [
    AppComponent,
    GuitarTunerComponent,
    TuningSettingsComponent,
    LearningIntervalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
