//Cannot use import statement outside a module
import config  from './dbconfig-env.js';
import usuario from './src/models/usuario.js';
import UsuarioServices from "./src/services/usuario-services.js";
//requiere cors para poder ser accedida desde el front
import  Express  from "express";
const app = Express();
//app.use(cors())
const port = 5000;
//recibe la informacion
app.get('/ingresosesion', async (req,res) =>{
    const MailContraseña = req.body;
    let data = await user.GetAll();
    res.send(data);
})

app.listen(port,() =>{
    console.log('ESCUCHANDO PORT 5000')
})