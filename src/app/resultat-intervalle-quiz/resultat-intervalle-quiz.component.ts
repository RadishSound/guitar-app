import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Questions } from '../models/Questions';
import { LearningIntervalService } from '../services/learning-interval.service';


@Component({
  selector: 'app-resultat-intervalle-quiz',
  templateUrl: './resultat-intervalle-quiz.component.html',
  styleUrls: ['./resultat-intervalle-quiz.component.css']
})
export class ResultatIntervalleQuizComponent {
  
  questionList !: Questions[];
  // questionList = new Array();
  bonneReponse = 0;
  constructor(private learningIntervalService : LearningIntervalService, private router: Router){

  }

  ngOnInit(){
    this.questionList = this.learningIntervalService.questionList;
    // for(let i =0; i<5; i++){
    //   let q1 = new Questions(2,5,2);
    //   q1.isCorrect = false;
    //   q1.numeroQuestion = i+1;
    //   q1.typeIntervalName = 'Ascendant';
    //   q1.nameInterval = 'seconde majeure';
    //   this.questionList[i] = q1;
    // }
    
    console.log(this.questionList);

    for(let question of this.questionList){
      if(question.isCorrect){
        this.bonneReponse++;
      }
    }
  }

  returnQuizMenu(){
    this.router.navigateByUrl('/learning-interval');

  }

  restartQuiz(){
    this.router.navigateByUrl('/question');

  }
  displayedColumns: string[] = ['numeroQuestion','reponse','correction','type' ];

}
