import * as ctrUser from "../controlls/user.controls.js";
import { Router } from "express"; 

const ruta = Router ();

ruta.post("/crearCuenta", ctrUser.crearCuenta);

export default ruta;