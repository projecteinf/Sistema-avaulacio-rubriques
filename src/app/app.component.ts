import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { LoginWebService } from './projecte/_model/01-serviceLayer/api/loginWebService';
import { LoginDAO } from './projecte/_model/03-persistenceLayer/impl/webStorage/daos/login/LoginDAO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  currentRoute: string;
  constructor(private loginWebService: LoginWebService, private router: Router) {
    this.currentRoute = "";
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) if (e.url != "/login") {
          this.verificarToken();
      }
    });
  }
  
  verificarToken() {
    this.loginWebService.verificarToken().subscribe(  
      {
        next: (v) => {
          if (this.prorrogarToken(v)) { 
            console.log(v['response'][0]),
            LoginDAO.save(JSON.stringify(JSON.parse(v['response'][0]).new));
          }
        },
        error: (e) => console.error("Error en l'execució"),        
      }            
    );
  }

  prorrogarToken(token: any):boolean {
    const keysObj:number = Object.keys(token).length;
    const renovar:number = JSON.parse(token['response'][0]).new.length;
    return Object.keys(token).length!==0 && JSON.parse(token['response'][0]).new.length!==0;
  }
}


