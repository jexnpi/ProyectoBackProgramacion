import mysql from "mysql2/promise"; //importamos el modulo mysql2 en modo promesa para usar async/await en la conexion a la base de datos mysql

//Traemos/importamos los datos de conexion/ configuracion que hicimos en environments.js
import environments from "../config/environments.js";
const {database} = environments;

const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

export default connection;

