import bcrypt, { hash } from "bcrypt";

const intentos = 10;

export async function crearCuenta(req, res){
    
    try {
        const {correo, clave, confirmacion} = req.body;
        if (clave == confirmacion){
            const hashed = await bcrypt.hash (clave, intentos);

            console.log(hashed);

            res.json({isok: true, msg: "Todo ok"})

        }else{
            res.json({isok: false, msg: "ERROR"})
        }
        
    } catch (error){
        
    }
}