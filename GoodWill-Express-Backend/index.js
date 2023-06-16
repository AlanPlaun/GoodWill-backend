
import config  from './dbconfig-env.js';
import usuario from './src/models/usuario.js';
import UsuarioServices from "./src/services/usuario-services.js";
import  Express  from "express";
import cors from 'cors';

const app = Express();
app.use(cors());
app.use(Express.json());
const port = 5000;
const usuarioServices = new UsuarioServices();

//recibe la informacion
app.post('/login', async (req,res) =>{
    const MailContraseña = req.body;
    console.log(MailContraseña.contraseña ,MailContraseña.email);
    const usuario = await usuarioServices.GetByMailAndPassword(MailContraseña);
    res.json({usuario});
})

app.listen(port,() =>{
    console.log('ESCUCHANDO PORT 5000')
})