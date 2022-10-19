import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './projecte/components/home/home.component';
import { LoginComponent } from './projecte/components/login/login.component';
import { Error404Component } from './projecte/components/error404/error404.component';
import { AvaluarComponent } from './projecte/components/avaluar/avaluar.component';
import { AuthGuardService } from './projecte/_model/01-serviceLayer/impl/AuthGuard/auth-guard-service.service';

// https://www.tektutorialshub.com/angular/angular-canactivate-guard-example/

const routes: Routes = [
  { path: 'avaluar', component: AvaluarComponent, canActivate:[AuthGuardService] },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
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




