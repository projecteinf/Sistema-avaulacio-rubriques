import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../lib/material.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './projecte/components/home/home.component';
import { LoginComponent } from './projecte/components/login/login.component';
import { Error404Component } from './projecte/components/error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    Error404Component,
  ],
  imports: [
    MaterialModule,
    BrowserModule, 
    FormsModule, 
    AppRoutingModule, 
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
