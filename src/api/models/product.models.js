//MODELO PRODUCTO
import connection from "../database/db.js" // Importamos la conexion a la BBDD

// SQL para seleccionar todos los productos
const selectAllProducts = async() => {
    let sql = `SELECT * FROM products`; //se crea la sentencia sql
        
    return await connection.query(sql);
    }

// SQL para seleccionar producto por su id //
const selectProductFromId = async (id) => {
    //let sql = `SELECT * FROM products where id = ${id}`;
    let sql =`SELECT * FROM products where id = ?`; //El ? sera reemplazado por el valor de id

    return await connection.query(sql,[id]); //ejecuta la consulta y devuelve los resultados(rows)
}

// SQL para crear nuevo producto 
const insertNewProduct = async(categoria, imagen, nombre, precio) =>{
    let sql = `INSERT INTO products (categoria, imagen, nombre, precio, activo) VALUES (?,?,?,?,?)`;
    
    return await connection.query (sql,[categoria,imagen,nombre,precio,1]);
}

// SQL para actualizar producto
const updateProduct = async(nombre, imagen, precio, categoria, activo, id) =>{
    let sql = `
        UPDATE products
        SET nombre = ?, imagen= ?, precio = ?, categoria = ?, activo = ?
        WHERE id = ?`;

    return await connection.query(sql,[nombre, imagen, precio, categoria, activo, id]); //guardamos la sentencia del sql      
}

// SQL para eliminar/desactivar producto
const deleteProduct = async(id) =>{
    /* let sql ="DELETE FROM products WHERE id = ?"; este codigo seria si lo queremos eliminar completamente */
    let sql = "UPDATE products SET activo = 0 WHERE id = ?"; //Baja logica, el lugar de eliminarse de actualiza su estado y se vuelve inactivo

    return await connection.query (sql, [id]);
}

export default{
    selectAllProducts,
    selectProductFromId,
    insertNewProduct,
    updateProduct,
    deleteProduct
}