import { ILoginDAO } from "../../../../api/login/ILoginDAO";
import { WebStoragePersistenceManager } from "../../../../managers/webStoragePersistenceManager";

export class LoginDAO implements ILoginDAO {
    static getLogin() {
        return WebStoragePersistenceManager.getData("login");
    }
    
}