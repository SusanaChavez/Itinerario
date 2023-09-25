import passport from "passport";
import { Strategy } from "passport-local";
import pool from "../basedato/db.js";
import helper from "./helper.js";

passport.use('local.iniciarsesion', new Strategy({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, usuario, password, done) =>{
    const filas = await pool.query('SELECT * FROM login WHERE usuario = ?', [usuario]);
    if (filas.length > 0){
        const usr = filas[0];
        const validar = await helper.matchPassword(password, usr.password);
        console.log(validar);
        if (validar) {
            return done(null, usr, req.flash('todoOk','Bienvenido ' + usr.nombre));
        } else{
            return done (null, false, req.flash('message','Contraseña incorrecta'));
        }
    } else {
       return done (null, false, req.flash('message','Usuario no existe'));
    }
}));

passport.use('local.registro', new Strategy({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, usuario, password, done) =>{
//    console.log(req.body);
    const {nombre} = req.body;
    const rol = "CLIENTE";
    const nuevo = {
        usuario,
        password,
        nombre,
        rol
    };
    nuevo.password = await helper.encryptPassword(password);
    const resultado = await pool.query('INSERT INTO login SET ?', [nuevo]);
    nuevo.id = resultado.insertId; //Necesito el id creado por la BD
    return done(null, nuevo); //Esto es, para crear una sesion para este usuario
}));

//Para guarda el usuario en la sesion
// https://www.passportjs.org/
/*
const user_cache = {};
passport.serializeUser((user, done) => {
    console.log('Estoyyyy......');        
    console.log(user);

//    process.nextTick(() => {
    const id = user._id;
    user_cache[id] = user;
 //   next(null, id);
     return done(null, {id});
//    });
});
*/

passport.deserializeUser(async (id, done) => {
    const fila = await pool.query('SELECT * FROM login WHERE idlogin = ?', [id], (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length > 0) {
                return done(null, result[0]);
            } else {
                return done(null, false);
            }
        }
    });
 //   done(null, fila[0]);
});

passport.serializeUser((user, done) => {
    process.nextTick(() => {
        return done(null, user.idlogin);
    });
  });
  
  /*
passport.deserializeUser( (user, done) => {
    console.log('Estoy desSerializando....');        
    process.nextTick(() => {
      return done(null, user);
    });
});
*/


/* Esto no funciona
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const fila = await pool.query('SEELCT * FROM login WHERE id = ?', [id]);
    done(null, fila[0]);
});
*/
export default passport;