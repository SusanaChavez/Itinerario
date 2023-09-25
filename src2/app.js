  import express from "express";
  import dotenv from "dotenv";
  
  import path from 'path';
  import { fileURLToPath } from 'url';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const app = express();
  /* Lo cambiamos por varianles de entorno */
  /* const port = 3000  */
  
  
  app.use(express.json());
  
    //3. Para variables de entorno ... 
  dotenv.config({ path: __dirname + '/.env' });
    //dotenv.config({path: './env/.env'});
    //dotenv.config();

    //4. Para asociar recursos a la carpeta que tiene todos los archivos publicos 
  app.use('/recursos',express.static('publico'));
  app.use('/recursos',express.static(`${__dirname}/publico`));

    // 5. Motor de plantillas
  app.set('view engine', 'ejs');

   //6. Para encriptar la clave que lo hago en otro lado
  import bcrypt, { hash } from "bcrypt";
  
    //7. definimos sessiones
  import sessiones from "express-session";
  app.use(sessiones({
    secret: 'secrect',
    resave: true,
    saveUninitialized: true
  }));

    //8. Llamamos a la conexion 
    //CREATE USER 'proyecto'@'%' IDENTIFIED BY 'proyecto';
  import conexion from "./basedato/db.js";

    //const conexion = require('./basedato/db');

    //9. Establecer rutas
    app.get('/',(req, res) => {
      res.sendFile(__dirname + "/publico/index.html");  
    })
  
    /*
    app.get('/', (req, res) => {
  //  res.send('Hoola !!!');
    res.render('index', {msg: 'VA un parametro'});
  })
*/
  app.get('/login', (req, res) => {
    //  res.send('Hoola !!!');
      res.render('login');
    })  
  app.get('/registrar', (req, res) => {
    //  res.send('Hoola !!!');
      res.render('registro');
    })
    //10 Registracion
  app.post('/registrar', async(req, res) =>{
    const usuario = req.body.usuario;
    const nombre = req.body.nombre;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordhash = await bcrypt.hash (pass, 8);
    conexion.query('INSERT INTO login SET ?',{usuario:usuario, nombre:nombre, rol:rol, clave:passwordhash}, 
      async(error, results) =>{
        if(error){
          console.log(error);
        }else{
          res.send('ALTA EXITOSA !!!')
        }
      })
  })

  //app.use(ruta);
  app.listen(process.env.PORT, () => {
    console.log(`Itinerario listening on port https://localhost:${process.env.PORT}`)
  })
  
  /*
  app.listen(port,(req, res) => {
    console.log('Itinerario en https://localhost:3000')
  })
  /*  
  https://www.youtube.com/watch?v=qJ5R9WTW0_E

  https://www.youtube.com/watch?v=loA1wDZ38OE
  
  https://www.youtube.com/watch?v=MbkXjF_CuVY

  react
    https://www.youtube.com/watch?v=2Ubrerbk8-w
    https://www.youtube.com/watch?v=2Ubrerbk8-w
  */