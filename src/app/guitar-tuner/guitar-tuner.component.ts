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


      }
    }

    tuningWithNote(note:string, harmonic: number) {
      
        this.guitarTunerService.tuningWithNote(note, harmonic);

    }
}
  