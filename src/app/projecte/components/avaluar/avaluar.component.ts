import { Component } from '@angular/core';
import { Login } from '../../_model/02-entitiesLayer/entities/login/Login';
import { LoginWebService } from '../../_model/01-serviceLayer/api/loginWebService';
import { RubricaWebService } from '../../_model/01-serviceLayer/api/RubricaWebService';
import { WebStoragePersistenceManager } from '../../_model/03-persistenceLayer/managers/webStoragePersistenceManager';
import { Rubrica } from '../../_model/02-entitiesLayer/entities/Rubrica/Rubrica';
import { CACHE_LLISTAT_ALUMNES, CACHE_RUBRICA } from '../../_model/04-utilitiesLayer/appUtilities';

@Component({
  selector: 'app-avaluar',
  templateUrl: './avaluar.component.html',
  styleUrls: ['./avaluar.component.css']
})
export class AvaluarComponent {

  students: Login[] = new Array<Login>();
  cursos!: String[];
  rubrica?: Rubrica;
  selCurs: boolean = false;
  currentCurs!: string;
  
  constructor(private loginWebService: LoginWebService,private rubricaWebService:RubricaWebService) { 
    
    this.getToken().subscribe(token => {
      let students = WebStoragePersistenceManager.getDataWithCaducity(this.getTeacherName(token));
      let curs =  JSON.parse(token).cursos;
      if (students == null) {
        loginWebService.getStudents().subscribe(students => {
          this.students = this.prepararLlistaAlumnes(curs,students);          
          WebStoragePersistenceManager.saveDataWithCaducity(this.getTeacherName(token),JSON.stringify(this.students),new Date(Date.now()+CACHE_LLISTAT_ALUMNES));
        });
      }
      else {
        // students = { value: Array , caducity: date }
        this.students = this.prepararLlistaAlumnes(curs,JSON.parse(JSON.parse(students).value));
      }
    });
  }

  prepararLlistaAlumnes(curs:any,students:any) {
    return students.filter(this.cursing.bind(this.cursing,curs)).sort((st1:any,st2:any) => st1.nom?.localeCompare(st2.nom));
  }

  studentChange(current:any) {
    this.getToken().subscribe(token => {

      let students = JSON.parse(JSON.parse(WebStoragePersistenceManager.getData(this.getTeacherName(token))).value);

      let cursos = students.filter( (student: { user: any; })  =>  student.user==current.value.user )[0].cursos;
      if (this.selCurs = cursos.length>1) {
        this.cursos=cursos;
        this.rubrica=undefined;
      }
      else {
        this.currentCurs=cursos[0];
        this.getRubrica(this.currentCurs);
      }
    }
  );}
  
  courseChange(current:any) {
    console.log(current.value);
    this.getRubrica(current.value);
  }

  studentDisplay(st1:Login,st2:Login): boolean {
    const isValue = st1 && st2 ? st1.usuari == st2.usuari : st1 === st2;
    if (isValue) Object.assign(st2,st1);
    return isValue;
  }

  cursing(curs:any, student:any) { 
    return student.cursos.filter((cursant: any) => curs.includes(cursant)).length>0; 
  }

  getToken() { return this.loginWebService.getToken();  }
  getTeacherName(token:any) { return JSON.parse(token).name;}
  getRubrica(curs:string) {
    this.rubricaWebService.getRubrica(curs).subscribe(rubrica => {
      this.rubrica = new Rubrica(JSON.stringify(rubrica));
      WebStoragePersistenceManager.saveDataWithCaducity(curs,JSON.stringify(rubrica),new Date(Date.now()+CACHE_RUBRICA))
    })
  }
}