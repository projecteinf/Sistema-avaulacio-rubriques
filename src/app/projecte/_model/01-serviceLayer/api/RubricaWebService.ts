import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})


export class RubricaWebService {
    constructor(private http:HttpClient) { }

    getRubrica(curs:string):Observable<any[]> { 
        var r=this.http.get<any>(`${environment.urlApi}getRubrica/curs`);
        return this.http.get<any>(`${environment.urlApi}getRubrica/curs`);       
     }
 }


