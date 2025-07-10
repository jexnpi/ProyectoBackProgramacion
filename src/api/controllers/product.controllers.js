//CONTROLADOR DE LA RESPUESTA DEL USUARIO
import Products from "../models/product.models.js";

//GET ALL PRODUCTS
// 1. Primer endpoint GET -> Traer todos los productos
export const getAllProducts = async(req,res) => {
    
    //Optimizacion, manejo de errores con try/catch
    try{
        //Al usar [rows] la desestructuracion extrae directamente las filas (que es el primer elemento del resultado de la consulta), nos sirve porque hace el codigo mas legible y explicito
        const [rows] = await Products.selectAllProducts();
    
        //Responde con exito aunque este vacio, o en caso de no estarlo responde la segunda secuencia
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ?  "No se encontraron usuarios" : "Usuarios encontrados"
        });
    }catch (error) {
        console.error("Error obteniendo productos", error);
        res.status(500).json({
            error: "Error interno del servidor al obtener productos"
        })
    }
}

//GET by ID
//2 Segundo endpoint GET by id -> traer producto por su id
export const getProductById = async(req, res) =>{
    
    try{
    let {id} = req.params; //Extrae el valor de id desde el parámetro de la ruta(URL)

    //Espera a que se ejecute la consulta y devuelve los resultados(rows)
    const [rows] = await Products.selectProductFromId(id);

    //Verificamos si se encontro el producto
    if (rows.length === 0){
        //Si no se encuentra ningún resultado, se devuelve un error 404(not found)
        return res.status(404).json({
            error:`No se encontro el producto con id: ${id}`
        })
    }

    //Si se encuentra el producto, se responde con código 200 y el resultado dentro de payload
    res.status(200).json({
        payload: rows
    });

    } catch (error) {
        //Captura cualquier error y devuelve una respuesta de error con codigo 500 (Internal Server Error).
        console.error(`Error obteniendo producto con id ${id}`, error.message);
        
        res.status(500).json({
            error: "Error interno al obtener un producto por id"
        })  
    }
}

//POST
//Create new product
// 3. Tercer endpoint POST -> Crear nuevos productos
export const createProduct = async (req,res) =>{
    try{
        let{categoria,imagen,nombre,precio} = req.body;
    
        if(!categoria || !imagen || !nombre || !precio){
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar categoria, imagen, nommbre y precio"
            });
        }

        const [rows] = await Products.insertNewProduct(categoria,imagen,nombre,precio);
        
        res.status(201).json({
            message:"Producto creado con exito",
            productId: rows.insertId //con productId devolvemos info util del insert para devolver el ID del producto creado
        })
    
    }catch(error){
        console.error(error);

        res.status(500).json({
            message:"Error interno del servidor",
            error: error.message
        })
    }
};

//UPDATE
// Modify product
// 4. Cuarto endpoint -> Update
export const modifyProduct = async (req,res)=>{
    try{
        let{categoria,imagen,nombre,precio, activo, id} = req.body;
    
        if(!categoria || !imagen || !nombre || !precio){
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }

        const [result] = await Products.updateProduct(nombre, imagen, precio, categoria, activo, id); //guardamos la sentencia del sql

         // Testeamos que se actualizara
        if(result.affectedRows ===0){
            return res.status(400).json({
                message:"No se actualizo el producto"
            })
        }
        res.status(200).json({
            message:"Producto actualizado correctamente"
        });
    
    }catch (error){
        console.log("Error al actualizar el producto");

        res.status(500).json({
            message:"Error interno del servidor",
            error: error.message
        })

    }};

//DELETE
// 4. Cuarto endpoint -> Delete 
//remove product
export const removeProduct= async(req,res) =>{
    try{
        let{id} = req.params;
        if (!id) {
            return res.status(400).json({
                message:"Se requiere un id para eliminar un producto"
            })
        }
        let [result] = await Products.deleteProduct(id);

        //Verificamos que se eliminara
        if(result.affectedRows === 0){
            return res.status(400).json({
                message : `No se encontro un producto con id ${id}`
            });
        }

        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });

    } catch (error) {
        console.error("Error en DELETE /products/:id", error);

        res.status(500).json({
            message: `Error al eliminar producto con id ${id}`, error,
            error: error.message
        })
    }
};
