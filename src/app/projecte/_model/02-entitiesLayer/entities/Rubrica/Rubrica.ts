import { EntityBase } from '../entityBase';
import { CapacitatClau } from './CapacitatClau';

export class Rubrica extends EntityBase{
    capacitatsClau: CapacitatClau[] = new Array<CapacitatClau>();

    public constructor(json:string) {
        super();
        let obj = JSON.parse(json);
        obj[0].capacitats.forEach((element: any) => {
            this.capacitatsClau?.push(new CapacitatClau(element.capacitat,element.valoracio))
        });
        
        
    }

}