import jwt from "jsonwebtoken"
import moment from "moment"
class jwtservice {
    createToken = (user) => {   
        console.log(user.idUsuario)
        let payload = {
            userId: user.idUsuario, //error
            createAt: moment().unix(),
            expiresAt:moment().add(1,'day').unix()
        }
        return jwt.sign(payload,process.env.TOKEN_KEY)
    }
    //cambiar para que el token pase por el authoritation header (no se :v)
    checktoken = (req,res,next) => {
      console.log("hola x")
        const token = req.body.user_token; // o donde sea que esté el token
    if (!token) {
      return res.status(401).json({ error: 'Token missing' });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      req.userId = decodedToken.userId;
      next(); // Llama al siguiente middleware o ruta protegida
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    }
    
}
export default jwtservice;