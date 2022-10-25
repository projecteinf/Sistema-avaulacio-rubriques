import { Component, OnInit } from '@angular/core';
import { LoginWebService } from '../../_model/01-serviceLayer/api/loginWebService';
import { RubricaWebService } from '../../_model/01-serviceLayer/api/RubricaWebService';
import { Login } from '../../_model/02-entitiesLayer/entities/login/Login';
import { Rubrica } from '../../_model/02-entitiesLayer/entities/Rubrica/Rubrica';
import { User } from '../../_model/02-entitiesLayer/entities/user/User';
import { WebStoragePersistenceManager } from '../../_model/03-persistenceLayer/managers/webStoragePersistenceManager';
import { CACHE_LLISTAT_ALUMNES, CACHE_RUBRICA } from '../../_model/04-utilitiesLayer/appUtilities';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// En el component app ja es comprova que el token sigui vàlid

export class HomeComponent {
  rubrica?: Rubrica;
  rubricaAvaluada?: Rubrica;
  selCurs: boolean = false;
  cursos!: string[];
  currentStudent!: any;
  currentCurs!: string;

  constructor(private loginWebService: LoginWebService,private rubricaWebService:RubricaWebService) { 
    this.loginWebService.getToken().subscribe(token => {
      if (token!=null) {
        this.cursos = JSON.parse(token).cursos;
        this.currentStudent = new User(JSON.parse(token).name,JSON.parse(token).rol,this.cursos);
        this.currentCurs = this.cursos[0];
        this.rubricaAlumne(this.currentStudent.nom,this.currentCurs);
        this.loginWebService.getStudent(this.currentStudent.nom).subscribe(user => {
          if (user.length!=0) {
            this.currentStudent.user = this.currentStudent.nom;
            this.currentStudent.nom = user[0].nom;
          }
        });
        if (this.cursos.length>1) this.selCurs = true;
      }
    });
  }

  cursing(curs:any, student:any) { 
    return student.cursos.filter((cursant: any) => curs.includes(cursant)).length>0; 
  }

  rubricaAlumne(name:string,curs:string) {
      this.getRubricaAvaluada(name,curs);
      this.getRubrica(curs);
  }

  courseChange(current:any) {
    this.rubrica=undefined;
    this.rubricaAvaluada=undefined;
    this.rubricaAlumne(this.currentStudent.user,current.value); 
    this.currentCurs = current.value;
  }

  getRubricaAvaluada(usuari: string, curs: any) {
    this.rubricaWebService.getRubricaPuntuada(usuari,curs).subscribe(rubrica => {
      if (rubrica.length!=0) this.rubricaAvaluada = new Rubrica(JSON.stringify(rubrica));
    });
  }

  getTeacherName(token:any) { return JSON.parse(token).name;}

  getRubrica(curs:string) {
      this.rubricaWebService.getRubrica(curs).subscribe(rubrica => {
          if (rubrica.length!=0) {
            this.rubrica = new Rubrica(JSON.stringify(rubrica));
            WebStoragePersistenceManager.saveDataWithCaducity(curs,JSON.stringify(rubrica),new Date(Date.now()+CACHE_RUBRICA))
          }
      });
  }

}
