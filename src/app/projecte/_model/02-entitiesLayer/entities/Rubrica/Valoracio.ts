import { EntityBase } from '../entityBase';

export class Valoracio extends EntityBase{
    nom: string;
    notaMaxima: number;
    notaMinima: number;

    public constructor(nom:string,notaMaxima:number,notaMinima:number) {
        super();
        this.nom = nom;
        this.notaMaxima = notaMaxima;
        this.notaMinima = notaMinima;
    }
}