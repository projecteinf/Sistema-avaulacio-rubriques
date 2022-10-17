import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})


export class RubricaWebService {
    saveRubrica(key: string, data: string) {

        return this.http.post<boolean>(`${environment.urlApi}saveRubrica`,{key,data});
    }
    constructor(private http:HttpClient) { }

    getRubrica(curs:string):Observable<any[]> { 
        return this.http.get<any>(`${environment.urlApi}getRubrica/${curs}`);
     }
 }


