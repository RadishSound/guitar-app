import { Component, Input } from '@angular/core';
import { Strings } from '../models/Strings';

@Component({
  selector: 'app-tuning-settings',
  templateUrl: './tuning-settings.component.html',
  styleUrls: ['./tuning-settings.component.css']
})
export class TuningSettingsComponent {

  noteList = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];
  @Input() stringTuned!: Strings;

}
