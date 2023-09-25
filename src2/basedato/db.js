import mysql from "mysql";

import dotenv from "dotenv";
dotenv.config({path: './src/env/.env'});

//Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support au
//Solucion:
//ALTER USER 'proyecto'@'localhost' IDENTIFIED WITH mysql_native_password BY 'proyecto';
//flush privileges;
//const conexion = async() => {
    const conexion = mysql.createConnection({
        host: "localhost", //process.env.DB_HOST,
        user: "proyecto",   //process.env.DB_USER,
        password: "proyecto",  //process.env.DB_PASSWORD,
        database: "itinerario",
    });
    
    conexion.connect((error) => {
        if (error){
            console.log('ERROR en la conexion: ' + error);
            return;
        }
        console.log('BD Conectada !!!');
    });

export default conexion;