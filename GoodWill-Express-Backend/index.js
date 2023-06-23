
import config  from './dbconfig-env.js';
import usuario from './src/models/usuario.js';
import UsuarioServices from "./src/services/usuario-services.js";
import auth from "./src/midleware/auth.js"
import  Express  from "express";
import cors from 'cors';

const app = Express();
app.use(cors());
app.use(Express.json());
const port = 5000;
const usuarioServices = new UsuarioServices();
cons auth = new auth

app.get('/login', async (req,res) =>{
    res.json("hola");
})

//recibe la informacion
app.post('/login', async (req,res) =>{
    const MailContraseña = req.body;
    if(MailContraseña){
        console.log(MailContraseña.contraseña ,MailContraseña.email);
        const usuario = await usuarioServices.GetByMailAndPassword(MailContraseña);
        if(usuario){

        }
        res.json({usuario});
    }
    else{
        res.send("no se ingreso el usuario y la contraseña")
    }
})


app.listen(port,() =>{
    console.log('ESCUCHANDO PORT 5000')
})