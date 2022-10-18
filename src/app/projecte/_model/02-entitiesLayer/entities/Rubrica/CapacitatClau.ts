import { EntityBase } from '../entityBase';
import { Valoracio } from './Valoracio';

export class CapacitatClau extends EntityBase{
    nom: string;
    valoracio: Valoracio[];
    nota?: number;

    public constructor(nom:string,valoracio:Valoracio[]) {
        super();
        this.nom = nom;
        this.valoracio = valoracio;
    }

    public setNota(nota:number) {
        this.nota = nota;
    }

    public setSeleccionada(index:number) {
        for(let i=0;this.valoracio.length;i++)  this.valoracio[i].setSeleccionada(false);
        this.valoracio[index].setSeleccionada(true);
            
    }
}