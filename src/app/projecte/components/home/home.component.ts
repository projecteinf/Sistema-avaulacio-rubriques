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
export class HomeComponent implements OnInit {
  students: User[] = new Array<User>();
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
        
        if (this.currentStudent.rol=="student") this.rubricaAlumne(this.currentStudent.user,this.currentStudent.cursos[0]);
        else 
          loginWebService.getStudents().subscribe(students => {
            if (this.cursos.length==1) {
              this.currentCurs = this.cursos[0];
              this.students = this.prepararLlistaAlumnes(this.currentCurs,students);
            }
            else {
              this.students = this.prepararLlistaAlumnes(this.cursos,students);      
            }
          })
      }
  });
  }

  prepararLlistaAlumnes(curs:any,students:any) {
    return students.filter(this.cursing.bind(this.cursing,curs)).sort((st1:any,st2:any) => st1.nom?.localeCompare(st2.nom));
  }


  cursing(curs:any, student:any) { 
    return student.cursos.filter((cursant: any) => curs.includes(cursant)).length>0; 
  }


  rubricaAlumne(name:string,curs:string) {
      this.getRubricaAvaluada(name,curs);
      this.getRubrica(name,curs);
  }

  studentChange(current:any) {
    let cursos = this.currentStudent.cursos;
    if (this.selCurs = cursos.length>1) {
      this.cursos=cursos;
      this.rubrica=undefined;
    }
    else {
      this.currentCurs=cursos[0];
      this.rubricaAlumne(this.currentStudent.user,this.currentCurs);
    }
  }


  studentDisplay(st1:Login,st2:Login): boolean {
    const isValue = st1 && st2 ? st1.usuari == st2.usuari : st1 === st2;
    if (isValue) Object.assign(st2,st1);
    return isValue;
  }


  ngOnInit(): void {
    // En el component app ja es comprova que el token sigui vàlid
  }

  courseChange(current:any) {
    this.rubricaAlumne(this.currentStudent.user,current.value); 
  }

  getRubricaAvaluada(usuari: string, curs: any) {
    this.rubricaWebService.getRubricaPuntuada(usuari,curs).subscribe(rubrica => {
      if (rubrica.length!=0) this.rubricaAvaluada = new Rubrica(JSON.stringify(rubrica));
    });
  }

  getTeacherName(token:any) { return JSON.parse(token).name;}

  getRubrica(usuari:string, curs:string) {
      this.rubricaWebService.getRubrica(curs).subscribe(rubrica => {
          if (rubrica.length!=0) {
            this.rubrica = new Rubrica(JSON.stringify(rubrica));
            WebStoragePersistenceManager.saveDataWithCaducity(curs,JSON.stringify(rubrica),new Date(Date.now()+CACHE_RUBRICA))
          }
      });
  }
}
