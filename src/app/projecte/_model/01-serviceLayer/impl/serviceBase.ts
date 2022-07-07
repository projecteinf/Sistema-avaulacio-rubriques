
import {IPersistenceManager} from '../../03-persistenceLayer/managers/iPersistenceManager';
import { PersistenceTechnologies } from '../../04-utilitiesLayer/appUtilities';


export abstract class ServiceBase{

    constructor(protected persistenceManagers:IPersistenceManager[]){

    }

    protected getPersistenceManager(persistenceTechnology:PersistenceTechnologies):IPersistenceManager{

        let persistenceManager:IPersistenceManager;
/*
        switch(persistenceTechnology){

                case PersistenceTechnologies.WEB_STORAGE:{
                      persistenceManager = this.persistenceManagers.find(pm=>pm instanceof WebStoragePersistenceManager)!;
                        break;
                    }
                case PersistenceTechnologies.REST_STORAGE:{
                    persistenceManager = this.persistenceManagers.find(pm=>pm instanceof RestStoragePersistenceManager)!;
                    break;
                }

        }
*/
        return persistenceManager!;

    }
} 
