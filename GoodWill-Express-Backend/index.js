import config from "./dbconfig-env.js";
import usuario from "./src/models/usuario.js";
import UsuarioServices from "./src/services/usuario-services.js";
import PublicacionesServices from "./src/services/publicaciones-services.js";
import CategoriasServices from "./src/services/categorias-services.js";
import imagenesServices from "./src/services/imagenes-services.js";
import jwtservice from "./middleware/middelware.js";
import Express from "express";
import cors from "cors";

const app = Express();
app.use(cors());
app.use(Express.json());
const port = 5000;
const usuarioServices = new UsuarioServices();
const publicacionesServices = new PublicacionesServices();
const categoriasServices = new CategoriasServices();
const imageneservices = new imagenesServices();
const auth = new jwtservice();

//recibe la informacion
app.post("/login", async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    // Input validation
    if (!email || !contrasena) {
      return res.status(400).json("No se ingresó el usuario y la contraseña");
    }
    
    console.log(contrasena, email);
    
    // Fetch user from usuarioServices
    const usuario = await usuarioServices.GetByMailAndPassword({
      email,
      contrasena,
    });

    console.log("LOGIN");
    if (usuario) {
      return res.json({
        successful: auth.createToken(usuario),
        done: "Login correct",
      });
    } else {
      return res.status(401).json("No se encontró al usuario");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error en el servidor");
  }
});

app.post("/categoriasProducto", async (req, res) => {
  res.json(await categoriasServices.GetByProducto(1))
});

app.get("/publicaciones", async (req, res) => {
  res.json(await publicacionesServices.getPublicacionJoined())
});

//HACER UN FILTRO ENTRE SERVICIO Y PRODUCTO
app.get("/publicaciones/servicio", async (req, res) => {
  res.json(await publicacionesServices.getPublicacionJoined())
});
app.get("/publicaciones/producto", async (req, res) => {
  res.json(await publicacionesServices.getPublicacionJoined())
});

app.get("/categorias", async (req, res) => {
  res.json(await categoriasServices.GetAll())
});
//publicar producto (descifrar el token y obtener el id del usuario) pasar la informacion a la base de datos
app.post("/publicar", auth.checktoken, async (req, res) => {
  try {
    const { titulo, descripcion, categoria } = req.body;
    const cat = await categoriasServices.GetBycategoria(categoria)
    const publicacion = await publicacionesServices.Insert({
      titulo,
      descripcion,
      fkCategoria : cat.idCategoria,
      fkUsuario: req.userId, 
    });
    return res.json(publicacion);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error en el servidor");
  }
});
app.post("/subirimagen", async (req, res) => {
  try {
    const { imagen, idPublicacion } = req.body;
    const publicacion = await imageneservices.Insert({
      imagen,
      idPublicacion,
    });
    return res.json(publicacion);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error en el servidor");
  }
});

app.post("/usuario", auth.checktoken, async (req, res) => {
  try {
    const usuario = await usuarioServices.GetById(req.userId);
    const publicaciones = await   publicacionesServices.getbyidusuario(req.userId);
    
    // Crear un objeto JSON que contenga ambas constantes
    const responseData = {
      usuario: usuario,
      publicaciones: publicaciones
    };
    // Enviar el objeto JSON como respuesta
    return res.json(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error en el servidor");
  }
})
app.listen(port, () => {
  console.log("ESCUCHANDO PORT 5000");
});