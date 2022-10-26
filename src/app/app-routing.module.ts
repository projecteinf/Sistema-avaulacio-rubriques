import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './projecte/components/home/home.component';
import { LoginComponent } from './projecte/components/login/login.component';
import { Error404Component } from './projecte/components/error404/error404.component';
import { AvaluarComponent } from './projecte/components/avaluar/avaluar.component';
import { isTeacher } from './projecte/_model/01-serviceLayer/impl/AuthGuard/isTeacher.service';
import { isStudent } from './projecte/_model/01-serviceLayer/impl/AuthGuard/isStudent.service';
import { PasswordsComponent } from './projecte/components/passwords/passwords.component';

// https://www.tektutorialshub.com/angular/angular-canactivate-guard-example/

const routes: Routes = [
  { path: 'avaluar', component: AvaluarComponent, canActivate:[isTeacher] },
  { path: 'home', component: HomeComponent, canActivate:[ isStudent ] },
  { path: 'login', component: LoginComponent },
  { path: 'passwords', component: PasswordsComponent },
  { path: '**', component: Error404Component}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }




