import { RubricaDAO } from '../../../03-persistenceLayer/impl/webStorage/daos/login/RubricaDAO';
import { EntityBase } from '../entityBase';
import { CapacitatClau } from './CapacitatClau';

export class Rubrica extends EntityBase{
    capacitatsClau: CapacitatClau[] = new Array<CapacitatClau>();

    public constructor(json:string) {
        super();
        let obj = JSON.parse(json);
        if (obj.length>0) {
            obj[0].capacitats.forEach((element: any) => {
                element.valoracio.forEach((v:any) => {
                        v.notaMaxima = v.max;
                        v.notaMinima = v.min;
                        v.seleccionada = false;
                    });
                this.capacitatsClau?.push(new CapacitatClau(element.capacitat,element.valoracio))
            });
        }
    }
    public guardar(key:string,data:string) {
        RubricaDAO.save(key,data);
    }

}