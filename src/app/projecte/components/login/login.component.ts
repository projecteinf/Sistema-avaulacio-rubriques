import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginWebService } from '../../_model/01-serviceLayer/api/loginWebService';
import { Login } from '../../_model/02-entitiesLayer/entities/login/Login';
import { LoginDAO } from '../../_model/03-persistenceLayer/impl/webStorage/daos/login/LoginDAO';

// URL: bezkoder.com/angular-12-jwt-auth/
@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide:boolean = true;                
  usuari?:string; 
  password?:string;  
  errorDades:boolean=false;

  constructor(private loginWebService: LoginWebService,private router:Router) {}

  autentificar() {
    var login:Login = Login.inicialitzar(this.usuari!,this.password!);
    
    this.loginWebService.autentificar(login).subscribe(token => {
       if (token!=null) {
            token=token = (<any>token)['response'][0]; 
            LoginDAO.save(<any>token!);
            this.errorDades = false;
            this.router.navigate(['/avaluar']);
       }
       else this.errorDades = true;
    });
  }

  prorrogarToken(token: any):boolean {
    return Object.keys(token).length!==0 && JSON.parse(token['response'][0]).new.length!==0;
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
}


