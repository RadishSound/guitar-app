import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuitarTunerComponent } from './guitar-tuner/guitar-tuner.component';
import { LearningIntervalComponent } from './learning-interval/learning-interval.component';

const routes: Routes = [ { path: 'guitar-tuner', component: GuitarTunerComponent },
{ path: 'learning-interval', component: LearningIntervalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

   
}
