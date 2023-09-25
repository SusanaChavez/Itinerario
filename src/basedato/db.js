import mysql from "mysql";
import { promisify } from "util";
import basedatos from "../Keys.js";

import dotenv from "dotenv";
dotenv.config({path: './src/env/.env'});

//Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support au
//Solucion:
//ALTER USER 'proyecto'@'localhost' IDENTIFIED WITH mysql_native_password BY 'proyecto';
//flush privileges;
//const conexion = async() => {
 /*   const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATOS
    });
    */
    const pool = mysql.createPool(basedatos);
        pool.getConnection((error, conexion) =>{
        if(error){
            if(error.code === "PROTOCOL_CONNECTION_LOST"){
                console.log('La BD perdio la conexion');
            }
            if(error.code === "ER_CON_COUNT_ERROR"){
                console.log('La BD tiene muchas conexiones');
            }
            if(error.code === "ECONNREFUSED"){
                console.log('La conexion de la BD fue rechazada');
            }
        }
    
        if (conexion) conexion.release();
        console.log('BD conectada !!!');
        return;
        });
//    return local;
//};
pool.query = promisify(pool.query);
export default pool;