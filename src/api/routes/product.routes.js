import {Router} from "express"; //Importamos el Middleware express.Router
import {validateId} from "../middlewares/middlewares.js"
import { getAllProducts, getProductById, createProduct, modifyProduct, removeProduct } from "../controllers/product.controllers.js";
const router = Router();

//GET
// 1. Primer endpoint GET -> Traer todos los productos
router.get("/",getAllProducts);  


//GET BY ID
//2 Segundo endpoint GET by id -> traer producto por su id
//Este endpoint responde a solicitudes GET para obtener un producto específico por su ID
//app.get(...): Define una ruta HTTP GET para /products/:id.
//validateId: Es un middleware que valida que el id tenga un formato correcto (por ejemplo, que sea un número).
router.get("/:id", validateId, getProductById);


//POST
// 3. Tercer endpoint POST -> Crear nuevos productos
router.post("/", createProduct); 

//UPDATE
// 4. Cuarto endpoint -> Update
router.put("/", modifyProduct);

//FIJARSE BIEN DELETE, que sea cambiando el active

//DELETE
// 4. Cuarto endpoint -> Delete 
router.delete("/:id", removeProduct);

export default router; //Exportamos las rutas