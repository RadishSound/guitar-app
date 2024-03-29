import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { delay } from 'rxjs';
import { LearningIntervalService } from '../services/learning-interval.service';


@Component({
  selector: 'app-learning-interval',
  templateUrl: './learning-interval.component.html',
  styleUrls: ['./learning-interval.component.css']
})
export class LearningIntervalComponent {


    fretPlaybackRateList !: number[];
    stringList!: AudioBuffer[];
    audioContext!: AudioContext;
    nombreQuestion!: number;
    tempsReponse!: number;
    intervalleListSetting!: boolean[];
    intervalleNameList!: String[];
    typeIntervalleListSetting!: boolean[];
    typeIntervalleNameList!: String[];


    constructor(private learningIntervalService: LearningIntervalService, private router: Router){

    }

     ngOnInit(){
      this.audioContext = this.learningIntervalService.audioContext;
      this.fretPlaybackRateList = this.learningIntervalService.fretPlaybackRateList;
       this.learningIntervalService.fetchSound();
       this.stringList = this.learningIntervalService.stringList;
       this.nombreQuestion = this.learningIntervalService.nombreQuestion;
       this.tempsReponse = this.learningIntervalService.tempsReponse;
       this.intervalleListSetting = this.learningIntervalService.intervalleListSetting;
       this.intervalleNameList = this.learningIntervalService.intervalleNameList;
       this.typeIntervalleNameList = this.learningIntervalService.typeIntervalleNameList;
       this.typeIntervalleListSetting = this.learningIntervalService.typeIntervalleListSetting;
      
      }

    startQuiz(){
      if(this.intervalleListSetting.includes(true) && this.typeIntervalleListSetting.includes(true)){
      this.learningIntervalService.tempsReponse = this.tempsReponse;
      this.learningIntervalService.nombreQuestion = this.nombreQuestion;
      this.learningIntervalService.intervalleListSetting = this.intervalleListSetting;
      this.learningIntervalService.typeIntervalleListSetting = this.typeIntervalleListSetting;
      this.router.navigateByUrl('/question');
      }
    }
    removeAllSettings(){
      this.intervalleListSetting = new Array(this.intervalleListSetting.length).fill(false);
      this.typeIntervalleListSetting = new Array(this.typeIntervalleListSetting.length).fill(false);

    }
    formatLabel(value: number): string {

      return `${value}s`;
    }

}
