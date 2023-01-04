import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LearningIntervalService {

  audioContext = new window.AudioContext();
}
