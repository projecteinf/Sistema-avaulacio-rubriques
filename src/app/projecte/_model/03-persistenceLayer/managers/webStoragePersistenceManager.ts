import { IPersistenceManager } from './iPersistenceManager';
export class WebStoragePersistenceManager implements IPersistenceManager{
    static getData(name:string):any {
        return localStorage.getItem(name);
    }

}
