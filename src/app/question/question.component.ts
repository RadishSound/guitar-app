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
  constructor(private learningIntervalService: LearningIntervalService, private router: Router) {

  }

  ngOnInit() {
    this.learningIntervalService.createQuestion();
    this.questionList = this.learningIntervalService.questionList;
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


  }

  replaySound() {
    this.learningIntervalService.playIntervalleSound(this.currentQuestion.stringNoteReference, this.currentQuestion.fretNoteReference, this.currentQuestion.interval);
  }

  validate() {


    if (this.currentAnswer === "") {
      console.log("Merci de choisir un intervalle avant de valider");
    } else {


      this.currentQuestion.isAnswered = true;
      this.currentQuestion.answer = this.currentAnswer;

      if (this.currentAnswer === this.currentResponse) {
        this.currentQuestion.isCorrect = true;
      } else {
        console.log("DOMMAGE");
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


      }else{
    this.currentQuestion = this.questionList[this.currentQuestion.numeroQuestion];
    this.currentResponse = this.learningIntervalService.intervalleNameList[Math.abs(this.currentQuestion.interval)];
    this.learningIntervalService.playIntervalleSound(this.currentQuestion.stringNoteReference, this.currentQuestion.fretNoteReference, this.currentQuestion.interval);
      }
   
    }    
  }
  returnQuizMenu() {
    this.router.navigateByUrl('/learning-interval');

  }




}
