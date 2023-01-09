import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuitarTunerComponent } from './guitar-tuner/guitar-tuner.component';
import { LearningIntervalComponent } from './learning-interval/learning-interval.component';
import { QuestionComponent } from './question/question.component';
import { ResultatIntervalleQuizComponent } from './resultat-intervalle-quiz/resultat-intervalle-quiz.component';

const routes: Routes = [ 
{ path: '', component: GuitarTunerComponent },

{ path: 'guitar-tuner', component: GuitarTunerComponent },
{ path: 'learning-interval', component: LearningIntervalComponent },
{ path: 'question', component: QuestionComponent },
{ path: 'resultat', component: ResultatIntervalleQuizComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

   
}
