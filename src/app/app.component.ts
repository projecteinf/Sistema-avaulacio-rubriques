import { Component } from '@angular/core';
import { map, of } from 'rxjs';
import { LoginWebService } 
  from './projecte/_model/01-serviceLayer/api/loginWebService';
import { ServiceManager } from './projecte/_model/01-serviceLayer/managers/serviceManager';
import { Login } from './projecte/_model/02-entitiesLayer/entities/login/Login';
import { LoginDAO } from './projecte/_model/03-persistenceLayer/impl/webStorage/daos/login/LoginDAO';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hide = true;                
  usuari?:string; 
  password?:string;  
  jwtToken?:string;

  constructor(private loginWebService: LoginWebService,private serviceManager: ServiceManager) {}

  autentificar() {
    var login:Login = Login.inicialitzar(this.usuari!,this.password!);
    
    this.loginWebService.autentificar(login).subscribe(token => {
       var tokenAux:any = token;
       if (tokenAux==null) console.log("Autentificació no vàlida");
       else this.jwtToken=tokenAux['response'][0];
       LoginDAO.save(this.jwtToken!);
       console.log(this.jwtToken);
    });
  }

  verificarToken() {
    this.loginWebService.verificarToken().subscribe(  
      {
        next: (v) => {
            if (JSON.parse(v['response'][0]).new.length!==0) {
              console.log(v['response'][0]),
              localStorage.setItem('login', JSON.stringify(JSON.parse(v['response'][0]).new))
            } else { 
              console.log("No renovació Token");
              console.log(v['response'][0]); 
            }
          },
        error: (e) => console.error("Error en l'execució"),        
      }            
    );
  }
}
