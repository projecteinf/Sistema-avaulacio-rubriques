import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Login } from '../../02-entitiesLayer/entities/login/Login';
import { environment } from 'src/environments/environment';
import { LoginDAO } from '../../03-persistenceLayer/impl/webStorage/daos/login/LoginDAO';


@Injectable({
    providedIn: 'root'
})


export class LoginWebService {
    
    login?:Login;
    constructor(private http:HttpClient) { }

    autentificar(login:Login):Observable<Login> {         
        return this.http.post<Login>(`${environment.urlApi}login`,JSON.stringify(login));
    }

    update(login:Login):Observable<Login> {         
        return this.http.get<Login[]>(`${environment.urlApi}update`); 
    }


    getToken():Observable<any> {
        return of(LoginDAO.get()); 
    }

    verificarToken():Observable<any> {
        const token:string = LoginDAO.get(); ;
        
        if (token!=null && tokenValid(token)) return of({});    // Token vàlid i vigent
        
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

    getStudents():Observable<Login[]> { 
       return this.http.get<Login[]>(`${environment.urlApi}getStudents`);       
    }

    getStudent(user: any) {
        return this.http.get<Login[]>(`${environment.urlApi}getStudent/${user}`);
    }

}

function tokenValid(token: any):boolean {
    const caduca:number = (JSON.parse(token)).expireAt;
    const prorroga_token:number = 50; // Percentatge. (50 implica a la meitat de la caducitat. Aquest paràmetre ha de coincidir amb l'especificat a Params.php (API)
    const limit = caduca * prorroga_token/100;
    const ara:number = (new Date).getTime()/1000 // Eliminem a partir de dècimes de segon
    return limit>ara;
}

