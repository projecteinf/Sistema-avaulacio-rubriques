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
  rubrica: any;

  constructor(private loginWebService: LoginWebService,private rubricaWebService:RubricaWebService) { 
    loginWebService.getStudents().subscribe(students => {
      this.students = students.sort((st1:any,st2:any) => st1.nom?.localeCompare(st2.nom));
    });

    var cursos = this.getCurrentUserCourses();
    rubricaWebService.getRubrica("2DAW").subscribe(rubrica => {
      this.rubrica = rubrica;
    })
  
  }

  getCurrentUserCourses() {
    this.loginWebService.getToken().subscribe(  
      {
        next: (token) => {
          console.log("Cursos token: " +JSON.parse(token).cursos);
        }
      }            
    );
  }

  ngOnInit(): void { }
  studentDisplay(st1:Login,st2:Login): boolean {
    const isValue = st1 && st2 ? st1.usuari == st2.usuari : st1 === st2;
    if (isValue) Object.assign(st2,st1);
    return isValue;
  }

}
