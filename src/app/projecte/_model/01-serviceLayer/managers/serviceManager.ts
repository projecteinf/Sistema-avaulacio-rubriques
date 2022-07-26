import { Injectable } from '@angular/core';
import { IPersistenceManager } from '../../03-persistenceLayer/managers/iPersistenceManager';
import { WebStoragePersistenceManager } from '../../03-persistenceLayer/managers/webStoragePersistenceManager';
import { IServiceManager } from './iServiceManager';

@Injectable({
    providedIn: 'root'
})

export class ServiceManager implements IServiceManager{
    private persistenceManagers?:IPersistenceManager[];

    constructor(){
        this.persistenceManagers=[];
        this.persistenceManagers.push(new WebStoragePersistenceManager());
    }

}     
