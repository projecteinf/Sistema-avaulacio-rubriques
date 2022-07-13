import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginWebService } from './projecte/_model/01-serviceLayer/api/loginWebService';
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
  loginWebService?:LoginWebService;

  autentificar() {
    this.loginWebService?.autentificar().subscribe(login=>console.log(login));
        
    
  }
}
