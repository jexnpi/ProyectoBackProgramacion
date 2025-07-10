/////////////////////////
//IMPORTACIONES//
import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js"; // Importamos las rutas de productos y vistas
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import {join, __dirname} from "./src/api/utils/index.js"


const PORT = environments.port;
const app = express();

//Configuramos el EJS como motor de plantillas
app.set("view engine" , "ejs");

//Definimos la ruta donde estan almacenadas las plantillass .ejs, con join combinamos el directorio raiz del proyecto con src/views
app.set("views", join(__dirname, "src/views"));

//Configuramos expresss para que sirva acrchivos estaticos desde la carpeta public/, archivos como style.sccc ,logo.png seran accesibles via HTTP
app.use(express.static(join(__dirname,"src/public")));


//////////////MIDDLEWARES/////////////////////////
//Funciones que se ejecutan entre la peticion y entre la respuesta
//app.use se usa para crear middlewares
//Middlewares de aplicacion -> Aplicados a nivel de aplicacion para todas las solicitudes
//Middleware de ruta -> Aplicados a rutas especificas y ejecutadas solo cuando una solicitud coincide con la ruta definida
app.use(express.json()); //Parseamos JSON en las solicitudes POST y PUT
app.use(cors()); //Middleware CORS basico que permite todas las solicitudes
app.use(loggerUrl); //Middleware Logger para analizar y registrar las solicitudes


//BORRAR
/* app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
}); */


//////////////RUTAS////////////////////////////////
app.get("/", (req, res) => {
    res.send("Hola mundo");
});

/////////////VIEWS/VISTAS/////////////////
app.use("/dashboard", viewRoutes); //rutas vistas

app.use("/api/products",productRoutes); //Rutas productos

//CRUD -> Create (POST)  - Read (GET) - Update (PUT) - Delete (DELETE)

//GET
// 1. Primer endpoint GET -> Traer todos los productos


//GET
//2 Segundo endpoint GET by id -> traer producto por su id
//Este endpoint responde a solicitudes GET para obtener un producto específico por su ID
//app.get(...): Define una ruta HTTP GET para /products/:id.
//validateId: Es un middleware que valida que el id tenga un formato correcto (por ejemplo, que sea un número).


//POST
// 3. Tercer endpoint POST -> Crear nuevos productos


//UPDATE
// 4. Cuarto endpoint -> Update


//DELETE
// 4. Cuarto endpoint -> Delete 




app.listen(PORT,() => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})


//REQUEST (req), hace las solicitudes
/* Conformado por:
Metodo: Indica que tipo de request es (si es un post, get, delete)
URL: Url con la que se quiere comunicar
Header: Dice que se devuelve
Body: Campo opcional, para incluir datos*/

/* METODOS DE REQUEST
GET: 
POST:
PUT:
DELETE:  */

//RESPONSE (res), atienden a las solicitudes del cliente
/* Conformado por:
Status code: Codigos que dicen si se pudo realizar la request
1XX: INFORMACION
100: continue
101: Switching protocols
103: early hints

2XX: EXITOSO
200: ok
201: creado
202: accepted
203: non-Authoritative Information
204: no content
205: reset content
206: Partial content

3XX: REDIRECCION
300: Multiple Choices
301: Moved Permanently
302: Found
303: See Other
304: Not Modified
307: Temporary Redirect
308: Permanent Redirect

4XX: ERROR DEL CLIENTE
400: Bad Request
404: Not Found

5XX: ERROR DEL SERVER
500: Internal Server Error
502: Bad Gateway

El header: Dice que se devuelve
Body: opcional, para incluir datos*/

//Hay que hacer un fetch para la base

//PARA CORRER EL PUERTO npm run dev
//DESCARGAR CORS npm i cors
//PARA ENTRAR AL PUERTO http://localhost:3000
