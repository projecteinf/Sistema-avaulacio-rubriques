import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPersistenceManager } from '../../03-persistenceLayer/managers/iPersistenceManager';
import { PersistenceTechnologies } from '../../04-utilitiesLayer/appUtilities';
import { IServiceManager } from './iServiceManager';

@Injectable({
    providedIn: 'root'
})

export class ServiceManager implements IServiceManager{
    private persistenceManagers?:IPersistenceManager[];

    constructor(){
        this.persistenceManagers=[];
       

    }

}     
