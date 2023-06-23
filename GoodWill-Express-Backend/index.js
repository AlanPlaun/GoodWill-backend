
import config  from './dbconfig-env.js';
import usuario from './src/models/usuario.js';
import UsuarioServices from "./src/services/usuario-services.js";
import jwtservice from "./src/middleware/middelware.js"
import  Express  from "express";
import cors from 'cors';

const app = Express();
app.use(cors());
app.use(Express.json());
const port = 5000;
const usuarioServices = new UsuarioServices();
const auth = new jwtservice()

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
            res.json({
                succesful: auth.createToken(),
                done: 'login correct'
            });
        }
    }
    else{
        res.send("no se ingreso el usuario y la contraseña")
    }
})
app.use(auth.checktoken)

app.listen(port,() =>{
    console.log('ESCUCHANDO PORT 5000')
})