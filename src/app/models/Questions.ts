import { Notes } from "./Notes";

export class Questions{
    isCorrect?: boolean;
    isAnswered!: boolean;
    interval!: number;
    stringNoteReference!: number;
    fretNoteReference!: number;
    isHarmonic!: boolean
    constructor(stringNoteReference: number, fretNoteReference: number,interval: number){
        this.interval = interval;
        this.stringNoteReference =stringNoteReference;
        this.fretNoteReference = fretNoteReference;
        this.isAnswered = false;
       this.isHarmonic = false;
    }
}