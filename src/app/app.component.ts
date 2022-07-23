import { Component } from '@angular/core';
import { map } from 'rxjs';
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
    // https://stackoverflow.com/questions/50490176/typescript-angular-try-catch-any-error-in-try-block-not-going-to-catch-block

    const validLogin = this.loginWebService.index().pipe(map(data => {
      //if (data === null) return ErrorObservable("null data")
      return data;
    }));

    validLogin.subscribe(
      data => console.log(data),
      console.error
    );
    /* 
    try {
      this.loginWebService.index().subscribe(total => {      
        console.log(total);
       
     });
    } catch (e) {
      console.log("Autentificació no vàlida");
    } */
    
  }
}
