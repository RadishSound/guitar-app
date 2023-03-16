export class Resultats{
    interval!: string;
    nombreDeQuestion!: number;
    bonneReponse!: number;
    constructor(interval: string){
        this.interval = interval;
        this.bonneReponse = 0;
        this.nombreDeQuestion = 0;
    }
}