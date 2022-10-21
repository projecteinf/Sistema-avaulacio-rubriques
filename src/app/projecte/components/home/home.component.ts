import { Component, OnInit } from '@angular/core';
import { LoginWebService } from '../../_model/01-serviceLayer/api/loginWebService';
import { RubricaWebService } from '../../_model/01-serviceLayer/api/RubricaWebService';
import { Rubrica } from '../../_model/02-entitiesLayer/entities/Rubrica/Rubrica';
import { WebStoragePersistenceManager } from '../../_model/03-persistenceLayer/managers/webStoragePersistenceManager';
import { CACHE_LLISTAT_ALUMNES, CACHE_RUBRICA } from '../../_model/04-utilitiesLayer/appUtilities';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rubrica?: Rubrica;
  selCurs: boolean = false;
  cursos!: String[];
  currentStudent!: any;

  constructor(private loginWebService: LoginWebService,private rubricaWebService:RubricaWebService) { 
    this.loginWebService.getToken().subscribe(token => {
      if (token!=null) {
        console.log(token);
      }
    });

  }

  ngOnInit(): void {
    // En el component app ja es comprova que el token sigui vàlid

    // Cal llegir la rúbrica si l'alumne només té un curs assignat!
  }

  courseChange(current:any) {
    
    this.getRubrica(this.currentStudent.user,current.value);
  }

  getRubrica(usuari:string, curs:string) {
    this.rubricaWebService.getRubricaPuntuada(usuari,curs).subscribe(rubrica => {
      if (rubrica.length!=0) this.rubrica = new Rubrica(JSON.stringify(rubrica));
      else {
        this.rubricaWebService.getRubrica(curs).subscribe(rubrica => {
          if (rubrica.length!=0) {
            this.rubrica = new Rubrica(JSON.stringify(rubrica));
            WebStoragePersistenceManager.saveDataWithCaducity(curs,JSON.stringify(rubrica),new Date(Date.now()+CACHE_RUBRICA))
          }
        });
      }
    });
  }

}
