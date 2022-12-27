import { Component} from '@angular/core';
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
    // stringTuningList = ["E3","B2","G2","D2","A1","E1"];

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

    tuningWithNote(note:string, harmonic: number, string: number) {
      
        this.guitarTunerService.tuningWithNote(note, harmonic, string);
        for (let index = 0; index < this.buttonActiveList.length; index++) {
          if(index === string-1){
            this.buttonActiveList[index]=true;

          }else{
            this.buttonActiveList[index]=false;

          }
        }

    }
}
  