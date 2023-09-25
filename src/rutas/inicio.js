import { Router } from "express"; 

const ruta = Router ();

//ruta.post("/crearCuenta", ctrUser.crearCuenta);

ruta.get('/', (req, res) => {
    res.render('home');
});

export default ruta;