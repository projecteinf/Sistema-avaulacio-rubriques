import { Component } from '@angular/core';
import { map, of } from 'rxjs';
import { LoginWebService } 
  from './projecte/_model/01-serviceLayer/api/loginWebService';
import { Login } from './projecte/_model/02-entitiesLayer/entities/login/Login';


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

  constructor(private loginWebService: LoginWebService) {}

  autentificar() {
    var login:Login = Login.inicialitzar(this.usuari!,this.password!);
    
    this.loginWebService.autentificar(login).subscribe(total => {
       var totalOk:any = total;
       if (totalOk==null) console.log("Autentificació no vàlida");
       else this.jwtToken=totalOk['response'][0];
       localStorage.setItem('login', this.jwtToken!);
       console.log(this.jwtToken);
      
    });
    
  }

  index() {
    this.loginWebService.index().subscribe(  
      {
        next: (v) => console.log(v),
        error: (e) => console.error("Error en l'execució"),        
      }            
    );
  }
}
