import { Component, OnInit } from '@angular/core';
import { LoginWebService } from '../../_model/01-serviceLayer/api/loginWebService';
import { RubricaWebService } from '../../_model/01-serviceLayer/api/RubricaWebService';
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
  rubrica?: Rubrica;
  rubricaAvaluada?: Rubrica;
  selCurs: boolean = false;
  cursos!: String[];
  currentStudent!: User;

  constructor(private loginWebService: LoginWebService,private rubricaWebService:RubricaWebService) { 
    this.loginWebService.getToken().subscribe(token => {
      if (token!=null) {
        this.currentStudent = new User(JSON.parse(token).name,JSON.parse(token).rol,JSON.parse(token).cursos);
        if (this.currentStudent.rol=="student") {
         this.rubricaAlumne();
        }
     }
    });
  }
  rubricaAlumne() {
    if (this.currentStudent.cursos.length==1) {
      this.getRubricaAvaluada(this.currentStudent.nom,this.currentStudent.cursos[0]);
      this.getRubrica(this.currentStudent.nom,this.currentStudent.cursos[0]);
    }
  }

  ngOnInit(): void {
    // En el component app ja es comprova que el token sigui vàlid
  }

  courseChange(current:any) {
    this.getRubricaAvaluada(this.currentStudent.nom,current.value);
    this.getRubrica(this.currentStudent.nom,current.value);   
  }

  getRubricaAvaluada(usuari: string, curs: any) {
    this.rubricaWebService.getRubricaPuntuada(usuari,curs).subscribe(rubrica => {
      if (rubrica.length!=0) this.rubricaAvaluada = new Rubrica(JSON.stringify(rubrica));
    });
  }

  

  getRubrica(usuari:string, curs:string) {
      this.rubricaWebService.getRubrica(curs).subscribe(rubrica => {
          if (rubrica.length!=0) {
            this.rubrica = new Rubrica(JSON.stringify(rubrica));
            WebStoragePersistenceManager.saveDataWithCaducity(curs,JSON.stringify(rubrica),new Date(Date.now()+CACHE_RUBRICA))
          }
      });
  }
}
