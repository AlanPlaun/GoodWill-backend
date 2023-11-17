// Importa las bibliotecas necesarias
import jwt from "jsonwebtoken";
import moment from "moment";

// Define la clase jwtservice que contendrá los métodos relacionados con los tokens JWT
class jwtservice {
  // Método para crear un token JWT basado en la información del usuario proporcionada
  createToken = (user) => {
    // Define el contenido del token (payload)
    let payload = {
      userId: user.idUsuario, // Información del usuario, en este caso, el ID de usuario
      createAt: moment().unix(), // Timestamp de creación del token (en formato UNIX)
      expiresAt: moment().add(1, "day").unix(), // Timestamp de expiración del token (1 día después de la creación)
    };

    // Utiliza jwt.sign para firmar el token con la clave secreta almacenada en process.env.TOKEN_KEY
    return jwt.sign(payload, process.env.TOKEN_KEY);
  };

  // Middleware para verificar la validez de un token en las solicitudes entrantes
  checktoken = (req, res, next) => {
    // Verifica si el encabezado 'user_token' está presente en la solicitud
    if (!req.headers["user_token"]) {
      return res.json({
        error: "You must include the header",
      });
    }

    // Obtiene el token del encabezado de la solicitud
    const token = req.headers["user_token"];
    let payload = null;

    try {
      // Intenta decodificar el token utilizando la clave secreta
      payload = jwt.decode(token, process.env.TOKEN_KEY);
    } catch (err) {
      // Captura errores durante la decodificación y devuelve un error de "token inválido"
      return res.json({
        error: "Invalid token",
      });
    }

    // Verifica si el token ha caducado comparando la fecha actual con la fecha de expiración del token
    if (moment().unix() > payload.expiresAt) {
      return res.json({ error: "Expired token" });
    }

    // Si el token es válido, agrega el userId al objeto req y pasa al siguiente middleware o ruta
    req.userId = payload.userId;
    next();
  };
}

// Exporta la clase jwtservice para que pueda ser utilizada en otros archivos
export default jwtservice;
