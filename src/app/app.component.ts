import { Component } from '@angular/core';
import { LoginWebService } 
  from './projecte/_model/01-serviceLayer/api/loginWebService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hide = true;                
  usuari?:string; 
  password?:string;  

  constructor(private loginWebService: LoginWebService) {}

  autentificar() {
    this.loginWebService.autentificar().subscribe(login=>console.log(login));
  }
}
