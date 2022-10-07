import { Component, OnInit } from '@angular/core';
import { Login } from '../../_model/02-entitiesLayer/entities/login/Login';
import { LoginWebService } from '../../_model/01-serviceLayer/api/loginWebService';
import { RubricaWebService } from '../../_model/01-serviceLayer/api/RubricaWebService';
import { LoginDAO } from '../../../projecte/_model/03-persistenceLayer/impl/webStorage/daos/login/LoginDAO';

@Component({
  selector: 'app-avaluar',
  templateUrl: './avaluar.component.html',
  styleUrls: ['./avaluar.component.css']
})
export class AvaluarComponent implements OnInit {

  students: Login[] = new Array<Login>();
  cursos!: String[];
  rubrica: any;
  
  constructor(private loginWebService: LoginWebService,private rubricaWebService:RubricaWebService) { 
    this.getToken().subscribe(token => {
      loginWebService.getStudents().subscribe(students => {
        let curs =  JSON.parse(token).cursos;
        let teacher = JSON.parse(token).name;
        this.students = students.filter(this.cursing.bind(this.cursing,curs)).sort((st1:any,st2:any) => st1.nom?.localeCompare(st2.nom));
        LoginDAO.saveStudentsTeacher(this.students,teacher);
      });
    });

    rubricaWebService.getRubrica("2DAW").subscribe(rubrica => {
      this.rubrica = rubrica;
    })
  }

  cursing(curs:any, student:any) { 
    return student.cursos.filter((cursant: any) => curs.includes(cursant)).length>0; 
  }

  getToken() { return this.loginWebService.getToken();  }

  studentChange(event:Event) {

  }
  
  studentDisplay(st1:Login,st2:Login): boolean {
    const isValue = st1 && st2 ? st1.usuari == st2.usuari : st1 === st2;
    if (isValue) Object.assign(st2,st1);
    return isValue;
  }
}