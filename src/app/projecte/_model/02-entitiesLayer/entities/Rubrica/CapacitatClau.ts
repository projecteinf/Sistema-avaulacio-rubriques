import { EntityBase } from '../entityBase';

export class CapacitatClau extends EntityBase{
    nom: string;
    valoracio: string[];

    public constructor(nom:string,valoracio:string[]) {
        super();
        this.nom = nom;
        this.valoracio = valoracio;
    }

    

}