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

    public static verificarPassword(password1: string, password2: string):boolean {
        return password1==password2 && new RegExp('^(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$').test(password1);
    }
}