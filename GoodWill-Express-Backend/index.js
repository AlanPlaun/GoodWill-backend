//Cannot use import statement outside a module
import config  from './dbconfig-env.js';
import usuario from './src/models/usuario.js';
import UsuarioServices from "./src/services/usuario-services.js";
// import express from 'express';
//requiere cors para poder ser accedida desde el front

import  Express  from "express";
const app = Express();
app.use(cors())
const port = 5000;

app.get('/usuarios', async (req,res) =>{
    const user = new UsuarioServices();
    let data = await user.GetAll();
    res.send(data);
})

app.listen(port,() =>{
    console.log('ESCUCHANDO PORT 5000')
})