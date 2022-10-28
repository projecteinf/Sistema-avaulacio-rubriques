import { Component, OnInit } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css']
})

export class PasswordsComponent implements OnInit {

// (Teoria) https://auth0.com/blog/hashing-in-action-understanding-bcrypt/
// https://stackoverflow.com/questions/54705148/implementing-bcrypt-in-angular-7
// npm install bcryptjs

  constructor() { }
  password?: string;
  resultat?: string;
  hide:boolean = false;
  

  ngOnInit(): void {
    
  }

  calcular() {

    bcrypt.hash(this.password!,12).then( hash => this.resultat=hash);
  }


  
}
