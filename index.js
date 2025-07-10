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

//Configuramos express para que sirvan los archivos estaticos desde la carpeta public/, archivos como style.ccs ,logo.png seran accesibles via HTTP
app.use(express.static(join(__dirname,"src/public")));


//////////////MIDDLEWARES/////////////////////////
//Funciones que se ejecutan entre la peticion y entre la respuesta
//app.use se usa para crear middlewares
app.use(express.json()); //Parseamos JSON en las solicitudes POST y PUT
app.use(cors()); //Middleware CORS basico que permite todas las solicitudes
app.use(loggerUrl); //Middleware Logger para analizar y registrar las solicitudes

//////////////RUTAS////////////////////////////////
app.get("/", (req, res) => {
    res.send("Hola mundo");
});

/////////////VIEWS/VISTAS/////////////////
app.use("/dashboard", viewRoutes); //Rutas vistas

app.use("/api/products",productRoutes); //Rutas productos

app.listen(PORT,() => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

//PARA CORRER EL PUERTO npm run dev
//DESCARGAR CORS npm i cors
//PARA ENTRAR AL PUERTO http://localhost:3000
