const jwt = require('jsonwebtoken');

class TokenController {

    getToken = (req) => {
        let token = null;
        // Capturar el beater token de la cabecera
        let authorization = req.headers.authorization;

        if (authorization !== null && authorization !== undefined) {
            // Tomar el token de la cadena de texto
            token = authorization.split(" ")[1];
        }
        return token;
    }

    verifyAuth = (req, res, next) => {
        // Obtener el token
        let token = this.getToken(req);
        //Verificar token
        jwt.verify(token, process.env.NODE_PRIVATE_KEY, (error, decode) => {
            if(error){
                res.status(401).json({message:"usuario no autenticado"})
            }else{
                next();
            }
        });
    }
}

module.exports = TokenController;