import { Login } from "src/app/projecte/_model/02-entitiesLayer/entities/login/Login";
import { ILoginDAO } from "../../../../api/login/ILoginDAO";
import { WebStoragePersistenceManager } from "../../../../managers/webStoragePersistenceManager";

export class LoginDAO implements ILoginDAO {
    static get() {
        return WebStoragePersistenceManager.getData("login");
    }
    static save(data:string) {
        return WebStoragePersistenceManager.saveData('login',data);
    }
    
}