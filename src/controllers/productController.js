const jwt = require('jsonwebtoken');

const Product = require('../models/product');
const TokenController = require('./tokenController');

class ProductController {

    constructor() {
        // Crear atributo de la clase tipo Token Controller
        this.tokenController = new TokenController();
    }

    create = (req, res) => {
        // obtener datos del cuerpo de la petición
        let { name, price } = req.body;
        // Obtener el token de la peticion
        let token = this.tokenController.getToken(req);
        // Decodificar el token para obtener el id del usuario
        let decode = jwt.decode(token, process.env.NODE_PRIVATE_KEY);

        Product.create({ name, price, user_id: decode.id }, (error, doc) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(201).json({ product: doc })
            }
        })
    }
}

module.exports = ProductController;