import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Login } from '../../02-entitiesLayer/entities/login/Login';

@Injectable({
    providedIn: 'root'
})

export class LoginWebService {
    constructor(private http:HttpClient) { }

    autentificar():Observable<Login> {
        return this.http.get<Login>("http://localhost:8080/api/login");
    }
}

