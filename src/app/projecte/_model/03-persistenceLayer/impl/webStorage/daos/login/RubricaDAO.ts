import { Login } from "src/app/projecte/_model/02-entitiesLayer/entities/login/Login";
import { IRubricaDAO } from "../../../../api/login/IRubricaDAO";
import { WebStoragePersistenceManager } from "../../../../managers/webStoragePersistenceManager";

export class RubricaDAO implements IRubricaDAO {
    static get():string {
        return WebStoragePersistenceManager.getData("rubrica");
    }
    static save(data:string) {
        return WebStoragePersistenceManager.saveData('rubrica',data);
    }
}