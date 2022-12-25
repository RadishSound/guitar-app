import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuitarTunerService {

  start(){
    var source;
      var audioContext = new window.AudioContext();
      var analyser = audioContext.createAnalyser();
      analyser.minDecibels = -100;
      analyser.maxDecibels = -10;
      analyser.smoothingTimeConstant = 0.85;
      if (!navigator?.mediaDevices?.getUserMedia) {
        // No audio allowed
        alert('Sorry, getUserMedia is required for the app.')
        return;
      } else {
        var constraints = {audio: true};
        navigator.mediaDevices.getUserMedia(constraints)
          .then((stream) => {
    
              // Initialize the SourceNode
              source = audioContext.createMediaStreamSource(stream);
              // Connect the source node to the analyzer
              source.connect(analyser);
              this.visualize(analyser, audioContext);
            }
          )
          .catch(function(err) {
            alert('Sorry, microphone permissions are required for the app. Feel free to read on without playing :)')
          });
        }
      }
    
 visualize(analyser: AnalyserNode, audioContext: AudioContext){

        let drawNoteVisual: any;
        let previousFrequenceToDisplay = 0;
        let previousNoteToDisplay = "A";
        let smoothingCount = 0;
        let smoothingCountThreshold = 5;
    
        // Thanks to PitchDetect: https://github.com/cwilso/PitchDetect/blob/master/js/pitchdetect.js
        var noteStrings = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
        const drawNote = () => {
          drawNoteVisual = requestAnimationFrame(drawNote);
          var bufferLength = analyser.fftSize;
          var buffer = new Float32Array(bufferLength);
          analyser.getFloatTimeDomainData(buffer);
          
          var autoCorrelateValue = this.autoCorrelate(buffer, audioContext.sampleRate);
    
          let valueToDisplay = autoCorrelateValue.toString();
          let noteToDisplay = noteStrings[Math.abs(this.noteFromPitch(autoCorrelateValue)) % 12];
          let harmoniqueToPlay = 3+Math.round(this.noteFromPitch(autoCorrelateValue) / 12);
          let frequenceToDisplay = Math.round(parseInt(valueToDisplay));
          console.log(frequenceToDisplay);          
          if (autoCorrelateValue === -1) {
            const note = <HTMLDivElement> document.getElementById('note');
            if(note){
             note.innerText = 'Too quiet...';
            return;
            }
          }
  
          if (this.noteIsSimilarEnough( frequenceToDisplay, previousFrequenceToDisplay, smoothingCountThreshold)) {
            

            if (smoothingCount < smoothingCountThreshold) {
              smoothingCount++;
              return;
            } else {
              previousFrequenceToDisplay = frequenceToDisplay;
              previousNoteToDisplay = noteToDisplay;
              
              smoothingCount = 0;
            }
          } else {
            previousFrequenceToDisplay = frequenceToDisplay;         
            previousNoteToDisplay = noteToDisplay;
             smoothingCount = 0;
            return;
          }
          let note = <HTMLDivElement> document.getElementById('note');
          let frequence = <HTMLDivElement> document.getElementById('frequence');
          let harmonique = <HTMLDivElement> document.getElementById('harmonique');


          if(note){
          note.innerText = noteToDisplay;
            }
          if(frequence){
            frequence.innerText = frequenceToDisplay.toString()+" Hz";
              }
          if(harmonique){
            harmonique.innerText = harmoniqueToPlay.toString();
              }
        }
        
        drawNote();
      
    
    // Must be called on analyser.getFloatTimeDomainData and audioContext.sampleRate
    // From https://github.com/cwilso/PitchDetect/pull/23
     
 }

  autoCorrelate(buffer: any, sampleRate: any) {
  // Perform a quick root-mean-square to see if we have enough signal
  var SIZE = buffer.length;
  var sumOfSquares = 0;
  for (var i = 0; i < SIZE; i++) {
    var val = buffer[i];
    sumOfSquares += val * val;
  }
  var rootMeanSquare = Math.sqrt(sumOfSquares / SIZE)
  if (rootMeanSquare < 0.01) {
    return -1;
  }

  // Find a range in the buffer where the values are below a given threshold.
  var r1 = 0;
  var r2 = SIZE - 1;
  var threshold = 0.2;

  // Walk up for r1
  for (var i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buffer[i]) < threshold) {
      r1 = i;
      break;
    }
  }

  // Walk down for r2
  for (var i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buffer[SIZE - i]) < threshold) {
      r2 = SIZE - i;
      break;
    }
  }

  // Trim the buffer to these ranges and update SIZE.
  buffer = buffer.slice(r1, r2);
  SIZE = buffer.length

  // Create a new array of the sums of offsets to do the autocorrelation
  var c = new Array(SIZE).fill(0);
  // For each potential offset, calculate the sum of each buffer value times its offset value
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE - i; j++) {
      c[i] = c[i] + buffer[j] * buffer[j+i]
    }
  }

  // Find the last index where that value is greater than the next one (the dip)
  var d = 0;
  while (c[d] > c[d+1]) {
    d++;
  }

  // Iterate from that index through the end and find the maximum sum
  var maxValue = -1;
  var maxIndex = -1;
  for (var i = d; i < SIZE; i++) {
    if (c[i] > maxValue) {
      maxValue = c[i];
      maxIndex = i;
    }
  }

  var T0 = maxIndex;

  // Not as sure about this part, don't @ me
  // From the original author:
  // interpolation is parabolic interpolation. It helps with precision. We suppose that a parabola pass through the
  // three points that comprise the peak. 'a' and 'b' are the unknowns from the linear equation system and b/(2a) is
  // the "error" in the abscissa. Well x1,x2,x3 should be y1,y2,y3 because they are the ordinates.
  var x1 = c[T0 - 1];
  var x2 = c[T0];
  var x3 = c[T0 + 1]

  var a = (x1 + x3 - 2 * x2) / 2;
  var b = (x3 - x1) / 2
  if (a) {
    T0 = T0 - b / (2 * a);
  }

  return sampleRate/T0;
}

  noteFromPitch( frequency: number ) {
  var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
  return Math.round( noteNum);
}


 noteIsSimilarEnough(frequenceToDisplay: number, previousFrequenceToDisplay: number, smoothingThreshold: number) {

    return Math.abs(frequenceToDisplay - previousFrequenceToDisplay) < smoothingThreshold;
}
}