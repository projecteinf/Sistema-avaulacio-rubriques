import { UniqueSelectionDispatcherListener } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { LoginWebService } from '../../_model/01-serviceLayer/api/loginWebService';
import { User } from '../../_model/02-entitiesLayer/entities/user/User';
import * as bcrypt from 'bcryptjs';
import { Login } from '../../_model/02-entitiesLayer/entities/login/Login';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  hide:boolean = true;                
  currentUser?: User;
  password?:string; 
  newPassword?:string[2];
  newPasswordPropi?:string[2];
  isTeacher: boolean = false;
  passwordNoComplexity: boolean = false;
  passwordNOK:boolean = false;
  passwordIncorrect:boolean = false;

  constructor(private loginWebService: LoginWebService) {
    this.loginWebService.getToken().subscribe(token => {
      if (token!=null) {
        this.currentUser = new User(JSON.parse(token).name,JSON.parse(token).rol);
        this.isTeacher = this.currentUser.isTeacher();
      }
    })
   }

  ngOnInit(): void {
  }

  canviar():void {
    var login:Login = Login.inicialitzar(this.currentUser!.nom,this.password!);
    this.loginWebService.autentificar(login).subscribe(token => {
      if (token!=null) {
        this.passwordIncorrect = false;
        bcrypt.hash(this.password!,12).then( hash => console.log(hash));
      }  
      else this.passwordIncorrect = true;
    });
  }
  canviarAdmin():void {
    
  }
}
