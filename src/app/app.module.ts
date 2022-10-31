import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../lib/material.module';
import { MatInputModule } from  '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './projecte/components/home/home.component';
import { LoginComponent } from './projecte/components/login/login.component';
import { Error404Component } from './projecte/components/error404/error404.component';
import { AvaluarComponent } from './projecte/components/avaluar/avaluar.component';
import { isTeacher } from './projecte/_model/01-serviceLayer/impl/AuthGuard/isTeacher.service'
import { isStudent } from './projecte/_model/01-serviceLayer/impl/AuthGuard/isStudent.service';
import { PasswordsComponent } from './projecte/components/passwords/passwords.component';
import { ChangePasswordComponent } from './projecte/components/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    Error404Component,
    AvaluarComponent,
    PasswordsComponent,
    ChangePasswordComponent,
    
  ],
  imports: [
    MaterialModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserModule, 
    FormsModule, 
    AppRoutingModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    
  ],
  providers: [isTeacher,isStudent],
  bootstrap: [AppComponent]
})
export class AppModule { }
