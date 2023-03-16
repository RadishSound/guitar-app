import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, TitleStrategy } from '@angular/router';
import { Questions } from '../models/Questions';
import { Resultats } from '../models/Resultats';

import { LearningIntervalService } from '../services/learning-interval.service';


@Component({
  selector: 'app-resultat-intervalle-quiz',
  templateUrl: './resultat-intervalle-quiz.component.html',
  styleUrls: ['./resultat-intervalle-quiz.component.css']
})
export class ResultatIntervalleQuizComponent {
  
  questionList !: Questions[];
  resultatParIntervalleList!:  Resultats[];
  bonneReponse = 0;
  constructor(private learningIntervalService : LearningIntervalService, private router: Router){

  }

  ngOnInit(){
    this.questionList = this.learningIntervalService.questionList;
    this.resultatParIntervalleList = this.learningIntervalService.resultatParIntervalleList
    .filter(_ => this.questionList.some(q => q.nameInterval === _.interval)); 
    this.bonneReponse = this.questionList.filter (_ => _.isCorrect).length
  }

  returnQuizMenu(){
    this.router.navigateByUrl('/learning-interval');

  }

  restartQuiz(){
    this.router.navigateByUrl('/question');

  }
  calculPourcentage(){

  }
  displayedColumns: string[] = ['numeroQuestion','reponse','correction','type' ];
  detailColumns: string[] = ['intervalle','nombre','pourcentage bonne réponse'];

}
