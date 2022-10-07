import { Component, OnInit } from '@angular/core';
import { Login } from '../../_model/02-entitiesLayer/entities/login/Login';
import { LoginWebService } from '../../_model/01-serviceLayer/api/loginWebService';
import { RubricaWebService } from '../../_model/01-serviceLayer/api/RubricaWebService';
import { LoginDAO } from '../../../projecte/_model/03-persistenceLayer/impl/webStorage/daos/login/LoginDAO';
import { WebStoragePersistenceManager } from '../../_model/03-persistenceLayer/managers/webStoragePersistenceManager';

@Component({
  selector: 'app-avaluar',
  templateUrl: './avaluar.component.html',
  styleUrls: ['./avaluar.component.css']
})
export class AvaluarComponent {

  students: Login[] = new Array<Login>();
  cursos!: String[];
  rubrica: any;
  
  constructor(private loginWebService: LoginWebService,private rubricaWebService:RubricaWebService) { 
    this.getToken().subscribe(token => {
      loginWebService.getStudents().subscribe(students => {
        let curs =  JSON.parse(token).cursos;
        this.students = students.filter(this.cursing.bind(this.cursing,curs)).sort((st1:any,st2:any) => st1.nom?.localeCompare(st2.nom));
        WebStoragePersistenceManager.saveData(this.getTeacherName(token),JSON.stringify(this.students));
      });
    });

    rubricaWebService.getRubrica("2DAW").subscribe(rubrica => {
      this.rubrica = rubrica;
    })
  }

  getTeacherName(token:any) { return JSON.parse(token).name;}

  cursing(curs:any, student:any) { 
    return student.cursos.filter((cursant: any) => curs.includes(cursant)).length>0; 
  }

  getToken() { return this.loginWebService.getToken();  }

  studentChange(current:any) {
    this.getToken().subscribe(token => {
      let students = JSON.parse(WebStoragePersistenceManager.getData(this.getTeacherName(token)));
      let cursos = students.filter( (student: { user: any; })  =>  student.user==current.value.user )[0].cursos;
    }
  );}
  
  studentDisplay(st1:Login,st2:Login): boolean {
    const isValue = st1 && st2 ? st1.usuari == st2.usuari : st1 === st2;
    if (isValue) Object.assign(st2,st1);
    return isValue;
  }
}