import { Component, OnInit } from '@angular/core';
import { LoginWebService } from '../../_model/01-serviceLayer/api/loginWebService';
import { Login } from '../../_model/02-entitiesLayer/entities/login/Login';
import { User } from '../../_model/02-entitiesLayer/entities/user/User';
import { WebStoragePersistenceManager } from '../../_model/03-persistenceLayer/managers/webStoragePersistenceManager';
import { CACHE_LLISTAT_ALUMNES, CACHE_RUBRICA } from '../../_model/04-utilitiesLayer/appUtilities';

@Component({
  selector: 'app-get-students',
  templateUrl: './get-students.component.html',
  styleUrls: ['./get-students.component.css']
})
export class GetStudentsComponent implements OnInit {
  currentStudent!: any;
  students: User[] = new Array<User>();
    

  constructor(private loginWebService: LoginWebService) { 
    this.loginWebService.getToken().subscribe(token => {
      if (token!=null) {
        let students = WebStoragePersistenceManager.getDataWithCaducity(this.getTeacherName(token));
        let curs =  JSON.parse(token).cursos;
        if (students == null) {
          loginWebService.getStudents().subscribe(students => {
            this.students = this.prepararLlistaAlumnes(curs,students);          
            WebStoragePersistenceManager.saveDataWithCaducity(this.getTeacherName(token),JSON.stringify(this.students),new Date(Date.now()+CACHE_LLISTAT_ALUMNES));
          });
        }
        else {
          this.students = this.prepararLlistaAlumnes(curs,JSON.parse(JSON.parse(students).value));
        }
      }
    });
  }

  ngOnInit(): void {
  }
  
  prepararLlistaAlumnes(curs:any,students:any) {
    return students.filter(this.cursing.bind(this.cursing,curs)).sort((st1:any,st2:any) => st1.nom?.localeCompare(st2.nom));
  }

  cursing(curs:any, student:any) { 
    return student.cursos.filter((cursant: any) => curs.includes(cursant)).length>0; 
  }


  getTeacherName(token:any) { return JSON.parse(token).name;}

  studentDisplay(st1:Login,st2:Login): boolean {
    const isValue = st1 && st2 ? st1.usuari == st2.usuari : st1 === st2;
    if (isValue) Object.assign(st2,st1);
    return isValue;
  }

  studentChange(current:any) {
    this.currentStudent = current.value;
  }


}
