import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Login } from '../../02-entitiesLayer/entities/login/Login';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class LoginWebService {
    constructor(private http:HttpClient) { }

    autentificar(login:Login):Observable<Login> {
        //return this.http.post<Login>(url,'{"Usuari":"nom usuari","Password":"Password usuari"}');
        return this.http.post<Login>(`${environment.urlApi}login`,JSON.stringify(login));
    }
}

