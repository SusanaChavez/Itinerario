import bcrypt, { hash } from "bcrypt";
import { buildCheckFunction } from "express-validator";

const helper = {};
helper.encryptPassword = async (password) =>{
    const saltos = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, saltos);
    return hash;
};

helper.matchPassword = async (password, clave) =>{
    try{
        return await bcrypt.compare(password, clave);
    }catch(e){
        console.log(e);
    };
}

export default helper;