import { config } from './dbconfig-env';
import usuario from './src/models/usuario';
import UsuarioServices from "./src/services/usuario-services";
// import express from 'express';

await ListarUsuarios();
async function ListarUsuarios() {

    const user = new UsuarioServices();
    let data = await user.GetAll();

    console.log(data);
}