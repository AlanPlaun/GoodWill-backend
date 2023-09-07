import config from "./dbconfig-env.js";
import usuario from "./src/models/usuario.js";
import UsuarioServices from "./src/services/usuario-services.js";
import PublicacionesServices from "./src/services/publicaciones-services.js";
import CategoriasServices from "./src/services/categorias-services.js";
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
const auth = new jwtservice();

app.get("/login", async (req, res) => {
  res.json("hola");
});

//recibe la informacion
app.post("/login", async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    console.log(email, contrasena)
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

//publicar producto (descifrar el token y obtener el id del usuario) pasar la informacion a la base de datos
app.post("/publicar", async (req, res) => {
  try {
    const { token, nombre, descripcion, precio, categoria } = req.body;
    console.log(req.body);
    const { userId } = auth.checktoken(token);
    console.log(userId);
    //chequear lo de los nulls
    const publicacion = await publicacionesServices.Insert({
      nombre,
      descripcion,
      precio,
      categoria,
      userId,
    });
    return res.json(publicacion);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error en el servidor");
  }
});

app.listen(port, () => {
  console.log("ESCUCHANDO PORT 5000");
});
