//view.routes.js se encarga de gestionar a que ruta llama el controlador
import {Router} from "express";
import { vistaListado, vistaConsultarId, vistaCrear,vistaModificar,vistaEliminar } from "../controllers/view.controllers.js";

const router = Router();

//RUTA DE VISTA LISTA
router.get ("/", vistaListado)

//RUTA DE VISTA CONSULTAR PRODUCTO POR ID
router.get ("/consultar", vistaConsultarId)

//RUTA DE VISTA CREAR PRODUCTO
router.get ("/crear", vistaCrear)

//RUTA DE VISTA MODIFICAR PRODUCTO
router.get ("/modificar", vistaModificar)

//RUTA DE VISTA ELIMINAR PRODUCTO
router.get ("/eliminar", vistaEliminar)

//Exportamos las rutas de las vistas
export default router;