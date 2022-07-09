import { Component } from '@angular/core';
import { Login } 
  from './projecte/_model/02-entitiesLayer/entities/Login/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hide = true;                
  usuari?:string; 
  password?:string;  

  guardar() {
    var login:Login;
    login = Login.inicialitzar(this.usuari!,this.password!);    
    console.log(login.toString());
  }
}
