if [ $# -ne 1 ]; then
	echo 'Usage: bash "Crear estructura projecte.sh" Folder' 
	exit 1
fi

dir=$1
last=${dir: -1}

if [ "$last" = "/" ]; then
	dir=${dir::-1}
fi


echo "Directori actual: $dir"

if [ ! -f "$dir/angular.json" ]; then
	echo "La carpeta '$1' no conté un projecte d'angular"; 
	echo "Usage: bash basic.sh Folder" 
	exit 1
fi

dir="$dir/src/app/projecte" # Directori on s'han de crear les carpetes

# Creació carpeta projecte
mkdir "$dir"

# Carpetes arrel projecte
echo "Creació carpetes arrel projecte"
mkdir "$dir/components" "$dir/guards" "$dir/interceptors" "$dir/_model" "$dir/services" 

# Fitxer base  (_model/01-serviceLayer)
touch "$dir/services/app.services.ts"

echo "import { IServiceManager } from '../_model/01-serviceLayer/managers/iServiceManager';
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
}" > "$dir/services/app.services.ts"

# Carpetes arrel (_model)
echo "Creació carpetes estructura model"

mkdir "$dir/_model/01-serviceLayer" \
	"$dir/_model/02-entitiesLayer" \
	"$dir/_model/03-persistenceLayer" \
 	"$dir/_model/04-utilitiesLayer"

echo "Creació carpetes estructura 01-serviceLayer"
# Carpetes arrel (_model/01-serviceLayer)
mkdir 	"$dir/_model/01-serviceLayer/api" \
	"$dir/_model/01-serviceLayer/impl" \
	"$dir/_model/01-serviceLayer/managers" 

echo "Incloure una carpeta per a cada entitat. Dins de cada carpeta (entitat) incloure la interfície associada a l'entitat." > "$dir/_model/01-serviceLayer/api/readme.md"
echo "Incloure una carpeta per a cada entitat. Dins de cada carpeta (entitat) incloure la implementació de la classe associada a la interfície definida en la carpeta '/01-serviceLayer/api'." > "$dir/_model/01-serviceLayer/api/readme.md"

echo "Creació fitxers estructura 01-serviceLayer"

# Fitxer base  (_model/01-serviceLayer)
touch 	"$dir/_model/01-serviceLayer/impl/serviceBase.ts" \
        "$dir/_model/01-serviceLayer/managers/iServiceManager.ts" \
        "$dir/_model/01-serviceLayer/managers/serviceManager.ts" \

echo "
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
} " > "$dir/_model/01-serviceLayer/impl/serviceBase.ts"

echo "
export interface IServiceManager{

    // getLoginService():ILoginService;  // Funcions de les quals s'ha d'implementar el servei

}     " > "$dir/_model/01-serviceLayer/managers/iServiceManager.ts" 

echo "import { IServiceManager } from './iServiceManager';


export class ServiceManager implements IServiceManager{


}     "  > "$dir/_model/01-serviceLayer/managers/serviceManager.ts" 

echo "Creació carpetes estructura 02-entitiesLayer"
# Carpetes arrel (_model/02-entitiesLayer)
mkdir 	"$dir/_model/02-entitiesLayer/entities" # Crear una carpeta per a cada entitat

echo "Creació fitxers estructura 02-entitiesLayer"
# Fitxer base (_model/02-entitiesLayer)
touch 	"$dir/_model/02-entitiesLayer/entities/entityBase.ts" 

# Instal·lació programa per a creació de claus úniques uuid
npm install uuid 
npm i --save-dev @types/uuid

echo "
import { v4 as uuidv4 } from 'uuid';

export abstract class EntityBase{

    id?:string;


    constructor(){
        this.id=uuidv4();

    }
} " > "$dir/_model/02-entitiesLayer/entities/entityBase.ts"

echo "Creació carpetes estructura 03-persistenceLayer"
# Carpetes arrel (_model/03-persistenceLayer)
mkdir 	"$dir/_model/03-persistenceLayer/api" \
	"$dir/_model/03-persistenceLayer/impl" \
	"$dir/_model/03-persistenceLayer/managers" 

echo "Incloure una carpeta per a cada entitat. Dins de cada carpeta (entitat) incloure la interfície associada a l'entitat." >>  "$dir/_model/03-persistenceLayer/api/readme.md"

mkdir  "$dir/_model/03-persistenceLayer/impl/restStorage" "$dir/_model/03-persistenceLayer/impl/restStorage/daos"
echo  "Incloure una carpeta per a cada entitat. Dins de cada carpeta (entitat) incloure la implementació de la classe associada a la interfície definida en la carpeta '03-persistenceLayer/api'." > "$dir/_model/03-persistenceLayer/impl/restStorage/daos/readme.md"

echo "import { IPersistenceManager } from './iPersistenceManager';
export class RestStoragePersistenceManager implements IPersistenceManager{


}" > "$dir/_model/03-persistenceLayer/managers/restStoragePersistenceManager.ts"

echo "Creació fitxers estructura 03-persistenceLayer"
# Fitxer base (_model/03-persistenceLayer)
touch "$dir/_model/03-persistenceLayer/managers/iPersistenceManager.ts"

echo "
export interface IPersistenceManager{


}" > "$dir/_model/03-persistenceLayer/managers/iPersistenceManager.ts"

echo "Creació fitxers estructura 04-utilitiesLayer"
# Fitxer base (_model/04-utilitiesLayer")
touch 	"$dir/_model/04-utilitiesLayer/appUtilities.ts"

echo "export enum PersistenceTechnologies{REST_STORAGE,WEB_STORAGE}" > "$dir/_model/04-utilitiesLayer/appUtilities.ts"

# Estructura bàsica curs

: <<'END'
├── components
├── guards
├── interceptors
├── _model
│   ├── 01-serviceLayer
│   │   ├── api
│   │   │   └── logins
│   │   │       └── iLoginService.ts
│   │   ├── impl
│   │   │   ├── logins
│   │   │   │   └── loginService.ts
│   │   │   └── serviceBase.ts
│   │   └── managers
│   │       ├── iServiceManager.ts
│   │       └── serviceManager.ts
│   ├── 02-entitiesLayer
│   │   └── entities
│   │       ├── entityBase.ts
│   │       └── logins
│   │           ├── login.ts
│   │           └── role.ts
│   ├── 03-persistenceLayer
│   │   ├── api
│   │   │   └── logins
│   │   │       └── iLoginDao.ts
│   │   ├── impl
│   │   │   ├── restStorage
│   │   │   │   └── daos
│   │   │   │       └── logins
│   │   │   │           └── loginDao.ts
│   │   │   └── webStorage
│   │   │       ├── daos
│   │   │       │   └── logins
│   │   │       │       └── loginDao.ts
│   │   │       └── managers
│   │   │           └── webStoragePersistenceManager.ts
│   │   └── managers
│   │       └── iPersistenceManager.ts
│   └── 04-utilitieslayer
│       └── appUtilities.ts
└── services
END

# Estructura generada amb script

: <<'END'
test
├── components
├── guards
├── interceptors
├── _model
│   ├── 01-serviceLayer
│   │   ├── api
│   │   ├── impl
│   │   │   └── serviceBase.ts
│   │   └── managers
│   │       ├── iServiceManager.ts
│   │       └── ServiceManager.ts
│   ├── 02-entitiesLayer
│   │   └── entities
│   │       └── entityBase.ts
│   ├── 03-persistenceLayer
│   │   ├── api
│   │   ├── impl
│   │   └── managers
│   │       └── iPersistenceManager.ts
│   └── 04-utilitiesLayer
│       └── appUtilities.ts
└── services
END
