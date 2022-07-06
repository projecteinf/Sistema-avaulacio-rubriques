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

echo "Creació fitxers estructura 01-serviceLayer"
# Fitxer base  (_model/01-serviceLayer)
touch 	"$dir/_model/01-serviceLayer/impl/serviceBase.ts" \
        "$dir/_model/01-serviceLayer/managers/iServiceManager.ts" \
        "$dir/_model/01-serviceLayer/managers/ServiceManager.ts" \

echo "Creació carpetes estructura 02-entitiesLayer"
# Carpetes arrel (_model/02-entitiesLayer)
mkdir 	"$dir/_model/02-entitiesLayer/entities" # Crear una carpeta per a cada entitat

echo "Creació fitxers estructura 02-entitiesLayer"
# Fitxer base (_model/02-entitiesLayer)
touch 	"$dir/_model/02-entitiesLayer/entities/entityBase.ts" 

echo "Creació carpetes estructura 03-persistenceLayer"
# Carpetes arrel (_model/03-persistenceLayer)
mkdir 	"$dir/_model/03-persistenceLayer/api" \
	"$dir/_model/03-persistenceLayer/impl" \
	"$dir/_model/03-persistenceLayer/managers" 

echo "Creació fitxers estructura 03-persistenceLayer"
# Fitxer base (_model/03-persistenceLayer)
touch "$dir/_model/03-persistenceLayer/managers/iPersistenceManager.ts"

echo "Creació fitxers estructura 04-utilitiesLayer"
# Fitxer base (_model/04-utilitiesLayer")
touch 	"$dir/_model/04-utilitiesLayer/appUtilities.ts"


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
