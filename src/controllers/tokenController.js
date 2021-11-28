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
}

module.exports = TokenController;