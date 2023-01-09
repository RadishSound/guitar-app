export class Notes{
    note!: string;
    harmonic!: number;
    stringNumero!: number;
    fretNumero!: number;
    constructor(note: string, harmonic: number, stringNumero: number){
        this.note = note;
        this.harmonic = harmonic;
        this.stringNumero = stringNumero;
    }
}