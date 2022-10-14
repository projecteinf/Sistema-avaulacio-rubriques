import { EntityBase } from '../entityBase';
import { Valoracio } from './Valoracio';

export class CapacitatClau extends EntityBase{
    nom: string;
    valoracio: Valoracio[];

    public constructor(nom:string,valoracio:Valoracio[]) {
        super();
        this.nom = nom;
        this.valoracio = valoracio;
    }
}