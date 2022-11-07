import { UniqueSelectionDispatcherListener } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { LoginWebService } from '../../_model/01-serviceLayer/api/loginWebService';
import { User } from '../../_model/02-entitiesLayer/entities/user/User';
import * as bcrypt from 'bcryptjs';
import { Login } from '../../_model/02-entitiesLayer/entities/login/Login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  hide:boolean = true;                
  currentUser?: User;
  password?:string; 
  newPassword1!:string;
  newPassword2!:string;
  newPasswordPropi1!:string;
  newPasswordPropi2!:string;
  isTeacher: boolean = false;
  passwordNoComplexity: boolean = false;
  passwordNOK:boolean = false;
  passwordIncorrect:boolean = false;

  constructor(private loginWebService: LoginWebService,private router:Router) {
    this.loginWebService.getToken().subscribe(token => {
      if (token!=null) {
        this.currentUser = new User(JSON.parse(token).name,JSON.parse(token).rol,JSON.parse(token).cursos);
        this.isTeacher = this.currentUser.isTeacher();
      }
    })
   }

  ngOnInit(): void {
  }

  canviar():void {
    var login:Login = Login.inicialitzar(this.currentUser!.nom,this.password!);
    this.loginWebService.autentificar(login).subscribe(token => {
      if (token!=null && Login.verificarPassword(this.newPasswordPropi1,this.newPasswordPropi2)) {
        this.passwordIncorrect = false;
        let dades:any=this.currentUser;
        bcrypt.hash(this.newPasswordPropi1,12).then( hash => {
            dades.password=hash;
            this.loginWebService.update(dades).subscribe(
                result => { 
                  this.router.navigate(['/login']);
                 }
            )});
        }  
      else this.passwordIncorrect = true;
    });
  }
  canviarAdmin():void {
    
  }
}
