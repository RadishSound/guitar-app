import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Questions } from '../models/Questions';
import { LearningIntervalService } from '../services/learning-interval.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  questionList!: Questions[];
  numeroQuestion!: number;
  currentQuestion!: Questions;
  answersIntervalleList  = new Array();
  currentAnswer!: string;
  currentResponse!: string;
  isFinished = false;
  constructor(private learningIntervalService : LearningIntervalService, private router: Router){

  }

    ngOnInit(){
      this.questionList = this.learningIntervalService.createQuestion();
      this.currentQuestion = this.questionList[0];
      this.numeroQuestion = 1;
      this.learningIntervalService.playIntervalleSound(this.currentQuestion.stringNoteReference,this.currentQuestion.fretNoteReference, this.currentQuestion.interval);
      for(let intervalle = 0; intervalle<this.learningIntervalService.intervalleNameList.length; intervalle++){
        if(this.learningIntervalService.intervalleListSetting[intervalle]){
          this.answersIntervalleList.push(this.learningIntervalService.intervalleNameList[intervalle]);
        }
      }
      console.log(this.answersIntervalleList);
      this.currentAnswer ="";
      this.currentResponse = this.learningIntervalService.intervalleNameList[Math.abs(this.currentQuestion.interval)];
      
    
    }

    replaySound(){
      this.learningIntervalService.playIntervalleSound(this.currentQuestion.stringNoteReference,this.currentQuestion.fretNoteReference, this.currentQuestion.interval);
    }

    validate(){
      
     
      if(this.currentAnswer === ""){
        console.log("Merci de choisir un intervalle avant de valider");
      }else{
      

        this.currentQuestion.isAnswered = true;
      
      if(this.currentAnswer === this.currentResponse){
          this.currentQuestion.isCorrect = true;
      }else{
        console.log("DOMMAGE");
          this.currentQuestion.isCorrect = false;
      }

      if(this.isFinished){
        this.router.navigateByUrl('/resultat');

      }
      

    }

    }
    nextQuestion(){
      this.numeroQuestion++;
      console.log(this.numeroQuestion);
      this.currentQuestion = this.questionList[this.numeroQuestion-1];
      this.currentResponse = this.learningIntervalService.intervalleNameList[Math.abs(this.currentQuestion.interval)];
      this.learningIntervalService.playIntervalleSound(this.currentQuestion.stringNoteReference,this.currentQuestion.fretNoteReference, this.currentQuestion.interval);
      
      if(this.numeroQuestion === this.questionList.length){
        console.log("terminer");
        document.getElementById('validate-button')!.innerHTML = "TERMINER";
        this.isFinished = true;
      }
    }
    returnQuizMenu(){
      this.router.navigateByUrl('/learning-interval');

    }




}
