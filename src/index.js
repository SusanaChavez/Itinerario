// https://www.youtube.com/watch?v=qJ5R9WTW0_E.
// Es muy ordenado para programars
// npm i  express express-handlebars express-session mysql express-mysql-session morgan bcryptjs passport
// passport-local timeago.js connect-flash express-validator
// npm i nodemon -D
//
// npm run dev
//
// Usar ip4 para abrir desde el celular Ej:  http://192.168.0.111:4000/
// Para subirlo a githup:
// https://www.youtube.com/watch?v=KNRHG4rEX9w

import express from "express";     //const express = require('express')
import morgan from "morgan";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import flash from "connect-flash";  //Es para mandar mensajes
import session from "express-session";
import MySQLSession from "express-mysql-session";
import passport from "passport";

import inicio from "./rutas/inicio.js"; // Si el archivo se llama index no ahce falta nombrarlo
import ayuda from "./lib/handlebars.js";
import rutas from "./rutas/links.js";
import autenticacion from "./rutas/autenticacion.js";
import basedatos from "./Keys.js";
import passdatos from "./lib/passport.js";

// Inicializacion
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MySQLStore = MySQLSession(session);
//const sessionStore = new MySQLStore(sessionStoreConfig, this.dbConnection);

// Setting
app.set('port', process.env.PORT || 4000); // PORT sino 3000
app.set('views', path.join(__dirname, 'vistas'));
console.log(__dirname);
console.log(app.get('views'));

app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partes'),
    extname: '.hbs',
    helpers: ayuda
}));

app.set('view engine', '.hbs');

// Midllewares = Llamadas
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(basedatos)
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Variables Globales
app.use((req, res, next) => {
    app.locals.ok = req.flash('todoOk');
    app.locals.mensaje = req.flash('message');
    app.locals.user = req.user;
    next();
});

// Rutas
app.use(inicio);
app.use(autenticacion);
app.use('/links', rutas);

// Archivos publicos
app.use(express.static(path.join(__dirname, 'publico')));

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`Itinerario listening on port https://localhost:${app.get('port')}`)
})