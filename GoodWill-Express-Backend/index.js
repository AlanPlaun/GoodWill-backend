// Importación de módulos y servicios
import config from "./dbconfig-env.js";
import usuario from "./src/models/usuario.js";
import UsuarioServices from "./src/services/usuario-services.js";
import PublicacionesServices from "./src/services/publicaciones-services.js";
import CategoriasServices from "./src/services/categorias-services.js";
import imagenesServices from "./src/services/imagenes-services.js";
import jwtservice from "./middleware/middelware.js";
import Express from "express";
import cors from "cors";
import ContratacionesServices from "./src/services/contrataciones-services.js";

// Creación de la aplicación Express
const app = Express();
app.use(cors());
app.use(Express.json());
const port = 5000;

// Instanciación de servicios
const usuarioServices = new UsuarioServices();
const publicacionesServices = new PublicacionesServices();
const categoriasServices = new CategoriasServices();
const imageneservices = new imagenesServices();
const contratacionesServices = new ContratacionesServices();
const auth = new jwtservice();

// Ruta para gestionar el inicio de sesión
app.post("/login", async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    // Validación de la entrada
    if (!email || !contrasena) {
      return res.status(400).json("No se ingresó el usuario y la contraseña");
    }

    // Buscar el usuario usando el servicio usuarioServices
    const usuario = await usuarioServices.GetByMailAndPassword({
      email,
      contrasena,
    });

    // Respuesta después del inicio de sesión
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

// Ruta para obtener todas las publicaciones
app.get("/publicaciones", async (req, res) => {
  res.json(await publicacionesServices.getPublicacionJoined());
});

// Ruta para obtener todas las categorías
app.get("/categorias", async (req, res) => {
  res.json(await categoriasServices.GetAll());
});

// Ruta para obtener categorías por tipo
app.post("/categoriasportipo", async (req, res) => {
  try {
    const { tipo } = req.body;
    res.json(await categoriasServices.GetByTipo(tipo));
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error en el servidor");
  }
});

// Ruta para obtener publicaciones por tipo
app.post("/publicacionesportipo", async (req, res) => {
  try {
    const { tipo } = req.body;
    res.json(await publicacionesServices.getByTipo(tipo));
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error en el servidor");
  }
});

// Ruta para publicar una nueva publicación
app.post("/publicar", auth.checktoken, async (req, res) => {
  try {
    const { titulo, descripcion, categoria, puntos } = req.body;
    const cat = await categoriasServices.GetBycategoria(categoria);
    const publicacion = await publicacionesServices.Insert({
      titulo,
      puntos,
      descripcion,
      fkCategoria: cat.idCategoria,
      fkUsuario: req.userId,
    });
    return res.json(publicacion);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error en el servidor");
  }
});

// Ruta para subir una imagen para una publicación
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

// Ruta para obtener información del usuario y sus publicaciones
app.post("/usuario", auth.checktoken, async (req, res) => {
  try {
    const usuario = await usuarioServices.GetById(req.userId);
    const publicaciones = await publicacionesServices.getbyidusuario(req.userId);

    // Crear un objeto JSON que contenga ambas constantes
    const responseData = {
      usuario: usuario,
      publicaciones: publicaciones,
    };

    // Enviar el objeto JSON como respuesta
    return res.json(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error en el servidor");
  }
});

// Ruta para contratar una publicación
app.post("/contratar", auth.checktoken, async (req, res) => {
  try {
    const { idPublicacion, fecha } = req.body;
    console.log(idPublicacion, fecha);

    // Verificar si el usuario ya ha contratado esta publicación
    const existingContratacion = await contratacionesServices.GetContratacionByUsuarioYPublicacion({
      fkUsuario1: req.userId,
      fkPublicacion: idPublicacion,
    });

    if (existingContratacion) {
      // El usuario ya ha contratado esta publicación
      return res.json({ haContratado: true });
    } else {
      // Si el usuario no ha contratado esta publicación, procedemos con la contratación
      const usuario = await usuarioServices.GetById(req.userId);
      const contratacion = await contratacionesServices.InsertNuevaContratacion({
        fechaInicio: fecha,
        fkUsuario1: usuario.idUsuario,
        fkPublicacion: idPublicacion,
        estado: "pendiente",
      });
      return res.json(contratacion);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error en el servidor");
  }
});

// Ruta para obtener contrataciones del usuario
app.post("/contrataciones", auth.checktoken, async (req, res) => {
  try {
    const usuario = await usuarioServices.GetById(req.userId);
    const contrataciones = await contratacionesServices.GetByIdUsuario(usuario.idUsuario);
    return res.json(contrataciones);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error en el servidor");
  }
});

// Ruta para finalizar una contratación
app.post("/finalizar", async (req, res) => {
  try {
    const { idContrataciones, fechaFinalizado } = req.body;
    const contratacion = await contratacionesServices.finalizarContratacion({
      fechaFin: fechaFinalizado,
      estado: "finalizado",
      idContrataciones: idContrataciones,
    });
    return res.json(contratacion);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error en el servidor");
  }
});

// Inicio del servidor en el puerto 5000
app.listen(port, () => {
  console.log("ESCUCHANDO PORT 5000");
});
