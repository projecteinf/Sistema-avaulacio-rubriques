import { HttpClient } from '@angular/common/http';
import { IPersistenceManager } from '../../03-persistenceLayer/managers/iPersistenceManager';
import { PersistenceTechnologies } from '../../04-utilitiesLayer/appUtilities';
import { IServiceManager } from './iServiceManager';


export class ServiceManager implements IServiceManager{
    private persistenceManagers?:IPersistenceManager[];

    constructor(){
        this.persistenceManagers=[];
       

    }

}     
