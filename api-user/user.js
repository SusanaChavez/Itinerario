/*  npm https://www.youtube.com/watch?v=loA1wDZ38OE
  https://expressjs.com/es/starter/hello-world.html   
  https://www.youtube.com/watch?v=MbkXjF_CuVY

  https://www.youtube.com/watch?v=bK3AJfs7qNY
  
  react
  https://www.youtube.com/watch?v=2Ubrerbk8-w
  https://www.youtube.com/watch?v=2Ubrerbk8-w*/

import express from "express";
import dotenv from "dotenv";
import ruta from "./src/routs/user.routs.js";

const app = express();
/* Lo cambiamos por varianles de entorno */
/* const port = 3000  */

dotenv.config();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API-USER')
})

app.use(ruta);

app.listen(process.env.PORT, () => {
  console.log(`Itinerario listening on port https://localhost:${process.env.PORT}`)
})