import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  hide:boolean = true;                
  usuari?:string; 
  password?:string; 
  newPassword?:string[2];

  constructor() { }

  ngOnInit(): void {
  }

  canviar():void {
    
  }
}
