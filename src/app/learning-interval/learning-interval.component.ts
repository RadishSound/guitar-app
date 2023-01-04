import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { delay } from 'rxjs';


@Component({
  selector: 'app-learning-interval',
  templateUrl: './learning-interval.component.html',
  styleUrls: ['./learning-interval.component.css']
})
export class LearningIntervalComponent {

    audioContext = new AudioContext();

    intensiteHarmocique = [7.5042,2.9335,1.2049,0.3264];
    stringE3 = new Audio('../assets/sound/E3.m4a');
    stringB2 = new Audio('../assets/sound/B2.m4a');
    stringG2 = new Audio('../assets/sound/G2.m4a');
    stringD2 = new Audio('../assets/sound/D2.m4a');
    stringA1 = new Audio('../assets/sound/A1.m4a');
    stringE1 = new Audio('../assets/sound/E1.m4a');
    string = [this.stringE3,this.stringB2,this.stringG2,this.stringD2,this.stringA1,this.stringE1];


     ngOnInit(){
      this.stringE3.playbackRate = this.stringE3.playbackRate*0.749;
     }

    playSound(numero: number){
 
      this.string[numero].preservesPitch = false;

      this.string[numero].play();
    }
    
  

    getValue(event: Event): number {
      return parseFloat((event.target as HTMLInputElement).value);
    }
  

}
