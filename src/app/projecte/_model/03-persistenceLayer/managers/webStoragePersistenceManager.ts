import { IPersistenceManager } from './iPersistenceManager';
export class WebStoragePersistenceManager implements IPersistenceManager{
    static saveData(name:string, data: string) {
        localStorage.setItem(name, data);
    }
    static getData(name:string):any {
        return localStorage.getItem(name);
    }

}
