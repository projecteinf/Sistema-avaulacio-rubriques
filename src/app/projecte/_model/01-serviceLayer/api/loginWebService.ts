import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
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

    index():Observable<any> {
        const token = localStorage.getItem('login');
        
        const headerDict = {
            'Access-Control-Allow-Origin':'http://localhost:4200',
            'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8;application/json',
            'Accept': 'application/json, text/plain, /',
            'Access-Control-Allow-Headers': 'Origin,Content-Type,Accept,Authorization',
            'Authorization': `Bearer ${token}`,
            };

        const requestOptions = {                                                                                                                                                                                 
            headers: new HttpHeaders(headerDict), 
            };
            
        try {
            return this.http.get<String>(`${environment.urlApi}login`,requestOptions);
        } catch (e) {
            return of({});;
        }
          
        
    }
}

