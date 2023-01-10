import { Notes } from "./Notes";

export class Questions{
    isCorrect?: boolean;
    isAnswered!: boolean;
    nameInterval!: string;
    answer!: string
    interval!: number;
    stringNoteReference!: number;
    fretNoteReference!: number;
    numeroQuestion!: number;
    typeInterval!: number;
    typeIntervalName!: string;
    constructor(stringNoteReference: number, fretNoteReference: number,interval: number){
        this.interval = interval;
        this.stringNoteReference =stringNoteReference;
        this.fretNoteReference = fretNoteReference;
        this.isAnswered = false;
    }
}