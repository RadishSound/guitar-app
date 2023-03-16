import { Injectable } from '@angular/core';
import { Questions } from '../models/Questions';
import { Resultats } from '../models/Resultats';

@Injectable({
  providedIn: 'root'
})
export class LearningIntervalService {

  audioContext = new AudioContext()
  stringList = new Array(6);
  fretPlaybackRateList = new Array(24);
  tempsReponse = 20;
  vitesseIntervalle = 1;
  intervalleListSetting = new Array(13);
  typeIntervalleListSetting = [true, true, true];
  typeIntervalleNameList = ["Ascendant", "Descendant", "Harmonie"];
  nombreQuestion = 1;
  intervalleNameList = ["Unisson", "Seconde mineure", "Seconde majeure", "Tierce mineure", "Tierce majeure", "Quarte","Triton","Quinte","Sixte mineure", "Sixte majeure", "Septième mineure","Septième majeure", "Octave"];
  questionList!: Questions[];
  resultatParIntervalleList = new Array();


  constructor(){
      for(let fret = 0; fret<24;fret++){
        let playbackRateStrij = 1;
        playbackRateStrij = Math.pow(2,fret/12);
        this.fretPlaybackRateList[fret] = playbackRateStrij;
      }
      for(let intervalle = 0; intervalle<13;intervalle++){
       this.intervalleListSetting[intervalle] = true;
       
       this.resultatParIntervalleList.push(new Resultats(this.intervalleNameList[intervalle]))

      }
  
    

  }  
  
  fetchSound(){
    fetch('../assets/sound/E3.mp3')
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
    .then(decodeAudio => {
      this.stringList[0] = decodeAudio;
    });


    fetch('../assets/sound/B2.mp3')
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
    .then(decodeAudio => this.stringList[1] = decodeAudio);

    fetch('../assets/sound/G2.mp3')
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
    .then(decodeAudio => this.stringList[2] = decodeAudio);

    fetch('../assets/sound/D2.mp3')
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
    .then(decodeAudio => this.stringList[3] = decodeAudio);

    fetch('../assets/sound/A1.mp3')
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
    .then(decodeAudio => this.stringList[4] = decodeAudio);

    fetch('../assets/sound/E1.mp3')
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
    .then(decodeAudio => this.stringList[5] = decodeAudio);

  }
  playSound(string: number, fret: number){
    const playback = this.audioContext.createBufferSource();
    const synthDelay = this.audioContext.createDelay();
    synthDelay.delayTime.value = 0.5;

    playback.buffer = this.stringList[string];
    playback.playbackRate.value = this.fretPlaybackRateList[fret];
    playback.connect(synthDelay);
    synthDelay.connect(this.audioContext.destination);

    playback.connect(this.audioContext.destination);
    playback.start();


}

playIntervalleSound(string: number, fret: number, intervalle: number){
  const playback = this.audioContext.createBufferSource();
  playback.buffer = this.stringList[string];
  playback.playbackRate.value = this.fretPlaybackRateList[fret];

  const playbackIntervalle = this.audioContext.createBufferSource();
  playbackIntervalle.buffer = this.stringList[string];
  playbackIntervalle.playbackRate.value = this.fretPlaybackRateList[fret+intervalle];

  playback.connect(this.audioContext.destination);
  playback.start();
  playbackIntervalle.start();

  const synthDelay = this.audioContext.createDelay(5);
  synthDelay.delayTime.value = this.vitesseIntervalle;

  playbackIntervalle.connect(synthDelay);
  synthDelay.connect(this.audioContext.destination);

}


createQuestion(){
  let questionList =  new Array();
  while(questionList.length<this.nombreQuestion){
    let string= Math.round(Math.random()*6);
    let fret= Math.round(Math.random()*23);
    let typeIndex= Math.round(Math.random()*(this.typeIntervalleListSetting.length-1));
    let intervalleIndex= Math.round(Math.random()*(this.intervalleListSetting.length-1));
    if(this.typeIntervalleListSetting[typeIndex] && this.intervalleListSetting[intervalleIndex]){
      let intervalle = intervalleIndex;
      if(typeIndex === 1){
        intervalle = -intervalleIndex;
      }
      if(typeIndex ===2){
        this.vitesseIntervalle = 0;
      }else{
        this.vitesseIntervalle = 1;
      }
      let question = new Questions(string,fret, intervalle);
      question.typeInterval = typeIndex;
      question.typeIntervalName = this.typeIntervalleNameList[typeIndex];
      question.nameInterval = this.intervalleNameList[Math.abs(intervalle)];
      question.numeroQuestion = questionList.length+1;

      if(0<fret+intervalle && fret+intervalle<24){
        questionList.push(question);
      }
    }
      
  }
  this.questionList = questionList;

}





}
