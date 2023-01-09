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
import {MatCheckboxModule} from '@angular/material/checkbox';
import { QuestionComponent } from './question/question.component';
import {MatRadioModule} from '@angular/material/radio';
import { ResultatIntervalleQuizComponent } from './resultat-intervalle-quiz/resultat-intervalle-quiz.component';





@NgModule({
  declarations: [
    AppComponent,
    GuitarTunerComponent,
    TuningSettingsComponent,
    LearningIntervalComponent,
    QuestionComponent,
    ResultatIntervalleQuizComponent
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
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
