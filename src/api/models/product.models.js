//MODELO PRODUCTO
import connection from "../database/db.js" // Importamos la conexion a la BBDD

// Seleccionar todos los productos //
const selectAllProducts = async() => {
    let sql = `SELECT * FROM products`; //se crea la sentencia sql
        
        //Al usar [rows] la desestructuracion extrae directamente las filas (que es el primer elemento del resultado de la consulta), nos sirve porque hace el codigo mas legible y explicito
        return await connection.query(sql);
    }

// Seleccionar producto por su id //
const selectProductFromId = async (id) => {
     //Consulta no optima porque permite la inyeccion SQL
    //let sql = `SELECT * FROM products where id = ${id}`;
    let sql =`SELECT * FROM products where id = ?`; //El ? sera reemplazado por el valor de id

    return await connection.query(sql,[id]); //ejecuta la consulta y devuelve los resultados(rows)
}

// Crear nuevo producto /
const insertNewProduct = async(categoria, imagen, nombre, precio) =>{
    let sql = `INSERT INTO products (categoria, imagen, nombre, precio) VALUES (?,?,?,?)`;
    return await connection.query (sql,[categoria,imagen,nombre,precio]);
}

// Actualizar producto //
const updateProduct = async(nombre, imagen, precio, categoria, activo, id) =>{
    let sql = `
        UPDATE products
        SET nombre = ?, imagen= ?, precio = ?, categoria = ?, activo = ?
        WHERE id = ?`;

    return await connection.query(sql,[nombre, imagen, precio, categoria, activo, id]); //guardamos la sentencia del sql      
}

// Eliminar producto //
const deleteProduct = async(id) =>{
    /* let sql ="DELETE FROM products WHERE id = ?"; */
    let sql = "UPDATE products SET activo = 0 WHERE id = ?"; /* MODIFICADO ACA */

    return await connection.query (sql, [id]);
}

export default{
    selectAllProducts,
    selectProductFromId,
    insertNewProduct,
    updateProduct,
    deleteProduct
}