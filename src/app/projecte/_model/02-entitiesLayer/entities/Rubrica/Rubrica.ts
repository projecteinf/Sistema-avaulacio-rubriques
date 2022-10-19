import { RubricaDAO } from '../../../03-persistenceLayer/impl/webStorage/daos/login/RubricaDAO';
import { EntityBase } from '../entityBase';
import { CapacitatClau } from './CapacitatClau';

export class Rubrica extends EntityBase{
    capacitatsClau: CapacitatClau[] = new Array<CapacitatClau>();

    public constructor(json:string) {
        super();
        let obj = JSON.parse(json);
        if (obj.length>0) {
            if (Object.prototype.hasOwnProperty.call(obj[0], 'capacitatsClau')) this.inicialitzarDeBD(obj[0].capacitatsClau);
            else this.inicialitzar(obj[0].capacitats);
        }
    }

    public inicialitzarDeBD(capacitats:any) {
        let i=0;
        capacitats.forEach((element: any) => {
            element.valoracio.forEach((v:any) => {
                    v=this.inicialitzarDades(v);
                });

            this.capacitatsClau?.push(new CapacitatClau(element.nom,element.valoracio));
            if (Object.prototype.hasOwnProperty.call(element, 'nota')) this.capacitatsClau[i++].nota=element.nota;
        });
    }

    public inicialitzar(capacitats:any) {
        capacitats.forEach((element: any) => {
            element.valoracio.forEach((v:any) => {
                v=this.inicialitzarDades(v);
            });
            this.capacitatsClau?.push(new CapacitatClau(element.capacitat,element.valoracio))
        });
    }

    private inicialitzarDades(v: any) {
        v.notaMaxima = v.max;
        v.notaMinima = v.min;
        
        if (Object.prototype.hasOwnProperty.call(v, 'seleccionada')) v.seleccionada = v.seleccionada;
            else v.seleccionada = false;
        return v;
    }


    public guardar(key:string,data:string) {
        RubricaDAO.save(key,data);
    }

}

