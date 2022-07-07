import { IServiceManager } from '../_model/01-serviceLayer/managers/iServiceManager';
import { ServiceManager } from '../_model/01-serviceLayer/managers/serviceManager';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})

export class AppService {
    private serviceManager?:IServiceManager;

    getServiceManager():IServiceManager{
        if(this.serviceManager==null) {
            this.serviceManager = new ServiceManager();
        }
        return this.serviceManager;
    }
}
