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
    console.log(this.questionList);
    this.currentAnswer = "";
    this.currentResponse = this.learningIntervalService.intervalleNameList[Math.abs(this.currentQuestion.interval)];
    this.currentTimer = -2;
    this.barTimer = 'accent';
    this.timer();

  }

  replaySound() {
    this.learningIntervalService.playIntervalleSound(this.currentQuestion.stringNoteReference, this.currentQuestion.fretNoteReference, this.currentQuestion.interval);
  }

  validate() {
    if (this.currentAnswer === "") {
      console.warn("Merci de choisir un intervalle avant de valider");
    } else {
      this.validateAnswer(this.currentAnswer);
    }
  }

  nextQuestion() {
    if (this.currentQuestion.isAnswered) {
      if (this.currentQuestion.numeroQuestion === this.questionList.length) {
        this.learningIntervalService.questionList = this.questionList;
        this.router.navigateByUrl('/resultat');
        this.currentTimer = -2;
      } else {
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

  timer() {

    this.currentTimer = -2;
    let validateButton = <HTMLButtonElement>document.getElementById('validate-button');
    validateButton.disabled = false;


     const timer = setInterval(() => {
      console.log(this.currentTimer);

      this.currentTimer = +(this.currentTimer + 0.1).toFixed(2);
      if (this.currentTimer === this.tempsReponse) {
        validateButton.disabled = true;
         this.validateAnswer("Time out");
         clearInterval(timer);

      }
      if(this.currentQuestion.isAnswered){
        clearInterval(timer);

      }
      if (this.currentTimer / this.tempsReponse > 0.8) {
        this.barTimer = 'warn';
      }

    }, 100);

  }

  validateAnswer(answer: string) {
    this.currentQuestion.isAnswered = true;
    this.currentQuestion.answer = answer;

    if (answer === this.currentResponse) {
      this.currentQuestion.isCorrect = true;
    } else {
      this.currentQuestion.isCorrect = false;

    }
  }

}


