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

  currentQuestion!: Questions;
  answersIntervalleList = new Array();
  currentAnswer!: string;
  currentResponse!: string;
  isFinished = false;
  questionList!: Questions[];
  tempsReponse!: number;
  currentTimer!: number;
  barTimer!: string;
  constructor(private learningIntervalService: LearningIntervalService, private router: Router) {

  }

  ngOnInit() {
    this.learningIntervalService.createQuestion();
    this.questionList = this.learningIntervalService.questionList;
    this.tempsReponse = this.learningIntervalService.tempsReponse;
    this.currentQuestion = this.questionList[0];
    this.learningIntervalService.playIntervalleSound(this.currentQuestion.stringNoteReference, this.currentQuestion.fretNoteReference, this.currentQuestion.interval);
    for (let intervalle = 0; intervalle < this.learningIntervalService.intervalleNameList.length; intervalle++) {
      if (this.learningIntervalService.intervalleListSetting[intervalle]) {
        this.answersIntervalleList.push(this.learningIntervalService.intervalleNameList[intervalle]);
      }
    }
    console.log(this.questionList.map(q => q.nameInterval));
    this.currentAnswer = "";
    this.currentResponse = this.learningIntervalService.intervalleNameList[Math.abs(this.currentQuestion.interval)];
    this.currentTimer = -1;
    this.barTimer = 'accent';
    this.timer();

  }

  replaySound() {
    this.learningIntervalService.playIntervalleSound(this.currentQuestion.stringNoteReference, this.currentQuestion.fretNoteReference, this.currentQuestion.interval);
  }

  validate() {


    if (this.currentAnswer = "") {
      console.log("Merci de choisir un intervalle avant de valider");
    } else {
      this.currentQuestion.isAnswered = true;
      this.currentQuestion.answer = this.currentAnswer;

      if (this.currentAnswer === this.currentResponse) {
        this.currentQuestion.isCorrect = true;
      } else {
        this.currentQuestion.isCorrect = false;
      }
    }
  }
  nextQuestion() {

    if(this.currentQuestion.isAnswered){
      if (this.currentQuestion.numeroQuestion === this.questionList.length) {
        console.log('fin quizz');
        this.learningIntervalService.questionList = this.questionList;
        this.router.navigateByUrl('/resultat');
        this.currentTimer = -1;


      }else{
    this.currentQuestion = this.questionList[this.currentQuestion.numeroQuestion];
    this.currentResponse = this.learningIntervalService.intervalleNameList[Math.abs(this.currentQuestion.interval)];
    this.learningIntervalService.playIntervalleSound(this.currentQuestion.stringNoteReference, this.currentQuestion.fretNoteReference, this.currentQuestion.interval);
    this.timer();
    

    
  }
   
    }    
  }
  returnQuizMenu() {
    this.router.navigateByUrl('/learning-interval');

  }

timer(){
  this.currentTimer = -1;
  let validateButton = <HTMLButtonElement>document.getElementById('validate-button');
  validateButton.disabled = false;


  const timer = setInterval(()=> { 
      
    this.currentTimer = +(this.currentTimer + 0.1).toFixed(2);
    console.log(this.currentTimer)
    if(this.currentTimer === this.tempsReponse){
      validateButton.disabled = true;
      console.log(validateButton);
      this.currentQuestion.isAnswered = true;
      this.currentQuestion.isCorrect = false;
      this.currentQuestion.answer = "Time out";
      clearInterval(timer);

    }
    if(this.currentTimer/this.tempsReponse >0.8){
      this.barTimer = 'warn';
    }
    
  },100);
  
}


}
