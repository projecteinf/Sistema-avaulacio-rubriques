import { UniqueSelectionDispatcherListener } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { LoginWebService } from '../../_model/01-serviceLayer/api/loginWebService';
import { User } from '../../_model/02-entitiesLayer/entities/user/User';

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

  }
  canviarAdmin():void {
    
  }
}
