//Logica para trabajar con archivos y rutas de proyecto en express.js

//Importacion de modulos para trabajar con rutas

//Convierte una URL de archivo del sistema en una ruta valida del sistema operativo (home/usuario/proyecto)
import {fileURLToPath} from "url";

//dirname extrae el directorio padre de una ruta
//join extrae una rutas como si fuera path.join(...) esto nos sirve para construir rutas
import {dirname, join} from "path";

//import.meta.url contiene la URL del archivo actual(file://home/user/project/src/api/utils/index.js)
//fileURLToPath la convierte en ruta local del sistema de archivos (/home/user/project/src/api/utils/index.js)
const __filename= fileURLToPath(import.meta.url);

//dirname (__filename) da el directorio actual de este archivo(/home/user/project/src/api/utils)
const __dirname = join(dirname(__filename), "../../.."); //con "../.." estamos retrocediendo niveles en la estructura del proyecto /utils -> tpIntegradorBack/ apuntamos a la raiz del proyecto

//exportamos __dirname y join para que otros archivos puedan importar y usar estas herramientas
export{
    __dirname,
    join
}



