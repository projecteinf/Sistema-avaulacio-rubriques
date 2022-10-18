import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})


export class RubricaWebService {
    saveRubrica(key: string, data: string) {
        const headerDict = {
            'Access-Control-Allow-Origin':'http://localhost:4200',
            'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8;application/json',
            'Accept': 'application/json, text/plain, /',
            'Access-Control-Allow-Headers': 'Origin,Content-Type,Accept,Authorization'
            };

        const requestOptions = {                                                                                                                                                                                 
            headers: new HttpHeaders(headerDict), 
            };

        console.log({"key":key,"data":data});
        return this.http.post<String>(`${environment.urlApi}saveRubrica`,{key,data},requestOptions);               
    }
    constructor(private http:HttpClient) { }

    getRubrica(curs:string):Observable<any[]> { 
        return this.http.get<any>(`${environment.urlApi}getRubrica/${curs}`);
     }
 }


