import config from "./dbconfig-env.js";
import usuario from "./src/models/usuario.js";
import UsuarioServices from "./src/services/usuario-services.js";
import jwtservice from "./middleware/middelware.js";
import Express from "express";
import cors from "cors";

const app = Express();
app.use(cors());
app.use(Express.json());
const port = 5000;
const usuarioServices = new UsuarioServices();
const auth = new jwtservice();

app.get("/login", async (req, res) => {
  res.json("hola");
});

//recibe la informacion
app.post("/login", async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    // Input validation
    if (!email || !contraseña) {
      return res.status(400).json("No se ingresó el usuario y la contraseña");
    }

    console.log(contraseña, email);

    // Fetch user from usuarioServices
    const usuario = await usuarioServices.GetByMailAndPassword({
      email,
      contraseña,
    });

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
app.use(auth.checktoken);

app.listen(port, () => {
  console.log("ESCUCHANDO PORT 5000");
});
