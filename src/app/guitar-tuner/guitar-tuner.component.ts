import { Component, Input} from '@angular/core';
import { Strings } from '../models/Strings';
import {GuitarTunerService} from '../services/guitar-tuner.service';


@Component({
  selector: 'app-guitar-tuner',
  templateUrl: './guitar-tuner.component.html',
  styleUrls: ['./guitar-tuner.component.css']
})
export class GuitarTunerComponent {

  constructor(private guitarTunerService: GuitarTunerService ){

  }

    isStarted = false;
    maticon = "mic_off";
    buttonActiveList = [false,false,false,false,false,false];
    isSetting = false;
    string1 = this.guitarTunerService.stringList[0];
    string2 = this.guitarTunerService.stringList[1];
    string3 = this.guitarTunerService.stringList[2];
    string4 = this.guitarTunerService.stringList[3];
    string5 = this.guitarTunerService.stringList[4];
    string6 = this.guitarTunerService.stringList[5];
    stringList = this.guitarTunerService.stringList;
   


    startTuning() {
      arguments.length
      this.isStarted = !this.isStarted;
      // console.log(this.isStarted);
      if(this.isStarted){
        this.maticon = "mic_none";
        this.guitarTunerService.start();


      }else{
        this.maticon = "mic_off";
        this.guitarTunerService.stop();
        for (let index = 0; index < this.buttonActiveList.length; index++) {
          
            this.buttonActiveList[index]=false;
                }
    
                }    
        }

    tuningWithNote(string: Strings) {
      
        this.guitarTunerService.tuningWithNote(string.note, string.harmonic, string.stringNumero);
        for (let index = 0; index < this.buttonActiveList.length; index++) {
          if(index === string.stringNumero-1){
            this.buttonActiveList[index]=true;

          }else{
            this.buttonActiveList[index]=false;

          }
        }

    }
    setTunedForm(string: Strings){
      let str = document.getElementById("string1");
      if(str){
        str.style.backgroundColor = "blue";
      }
    }
    setTuned(){
      this.isSetting = true;
      this.isStarted = false;
    }
    isSet(){
      this.isSetting = false;
      this.startTuning();
    }
    setMiBemolTuning(){
      this.string1.note = "D#";
      this.string2.note = "A#";
      this.string3.note = "F#";
      this.string4.note = "C#";
      this.string5.note = "G#";
      this.string6.note = "D#";
    }
}
  