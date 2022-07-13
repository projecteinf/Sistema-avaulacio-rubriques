import { Observable } from "rxjs";
import { Login } from "../../../02-entitiesLayer/entities/login/Login";

export interface ILoginDAO {
    login(login:Login):Observable<Login>
}