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

  ngOnInit(): void {
    const salt = bcrypt.genSaltSync(10);
    const pass = bcrypt.hashSync('Pass@123', 10);
    console.log(`${salt}<br>${pass}`);
  }


  
}
