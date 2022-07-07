
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
