import { EntityBase } from '../entityBase';

export class Login extends EntityBase{
    usuari?: string;
    password?: string;
    nom?: string;
    rol?: string;

    public static inicialitzar(usuari:string, password:string): Login {
        var login: Login = new Login();        
        login.usuari = usuari;
        login.password = password;
        return login;
    }

    override toString():string {
        return `Id: ${this.id} | Usuari:${this.usuari} | Password:${this.password}`;
    }
}