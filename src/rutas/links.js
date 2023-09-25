import {Router} from "express";
import pool from "../basedato/db.js";
import * as funcion from "../lib/evaluar.js";

const ruta = Router ();

ruta.get('/tarjetas', funcion.estaLogeado, (req, res) => {
    res.render('links/tarjetas');
});

ruta.get('/add', funcion.estaLogeado, (req, res) => {
    res.render('links/add');
});

ruta.get('/', funcion.estaLogeado, async (req, res) => {
    const datos = await pool.query('SELECT * FROM login'); 
    console.log(datos);
    res.render('links/listar',{ datos });
});
ruta.post('/add', (req, res) => {
    console.log(req.body);
    req.flash('todoOk','Se guardo correctamente');
    res.redirect('/links');
});

// Para cuando deba borrar un registro de algo jajaja
ruta.get('/borrar/:id', funcion.estaLogeado, async (req, res) =>{
    const {id} = req.params;
    await pool.query('DELETE FROM usuario WHERE ID = ?', [id]);
    res.redirect('/links');
});
// Falta crear la vista editar
ruta.get('/editar/:id', funcion.estaLogeado, async (req, res) =>{
    const {id} = req.params;
    const datos = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
    res.render('links/editar', {link: datos[0]});
});

ruta.get('/editar/:id', async (req, res) =>{
    const {id} = req.params;
    const {titulo, url, descripcion} = req.body;
    const nuevo = {
        titulo,
        url,
        descripcion
    };
    await pool.query('UPDATE usuario SET ? id = ?', [nuevo, id]);
    res.render('/links');
});

export default ruta;
