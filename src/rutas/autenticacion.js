import passport from "passport";
import {Router} from "express"
const ruta = Router ();
import * as funcion from "../lib/evaluar.js";


ruta.get('/registrar', funcion.noLogeado, (req, res) =>{
    res.render('logeo/registrar');
});

ruta.post('/registrar', passport.authenticate('local.registro', {
        successRedirect: '/profile',
        failureRedirect: '/registrar',
        failureFalsh: true
}));

ruta.get('/iniciarsesion', funcion.noLogeado, (req, res) => {
    res.render('logeo/iniciarsesion');
});
/*
ruta.post('/iniciarsesion', passport.authenticate('local.iniciarsesion', {
    successRedirect: '/profile',
    failureRedirect: '/iniciarsesion',
    failureFalsh: true
}));

*/

ruta.post('/iniciarsesion', (req, res, next) => {
    passport.authenticate('local.iniciarsesion', {
        successRedirect: '/profile',
        failureRedirect: '/iniciarsesion',
        failureFalsh: true
    })(req, res, next);
});

ruta.get('/profile', funcion.estaLogeado, (req, res) =>{
    res.render('profile');
});

ruta.get('/cerrarsesion', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/iniciarsesion');
    });
});

export default ruta;