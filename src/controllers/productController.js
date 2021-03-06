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
        let { name, price, url_img } = req.body;
        // Obtener el token de la peticion
        let token = this.tokenController.getToken(req);
        // Decodificar el token para obtener el id del usuario
        let decode = jwt.decode(token, process.env.NODE_PRIVATE_KEY);

        Product.create({ name, price, url_img, user_id: decode.id }, (error, doc) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(201).json({ product: doc })
            }
        })
    }

    getByUser = (req, res) => {
        // Obtener el token de la peticion
        let token = this.tokenController.getToken(req);
        // Decodificar el token para obtener el id del usuario
        let decode = jwt.decode(token, process.env.NODE_PRIVATE_KEY);

        Product.find({ user_id: decode.id }, (error, products) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json({ products })
            }
        })
    }

    getAll = (req, res) => {
        Product.find((error, products) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json({ products })
            }
        })
    }

    update = (req, res) => {
        // Obtener datos del producto a editar
        let { id, name, price, img_url } = req.body;

        // Obtener el token de la peticion
        let token = this.tokenController.getToken(req);
        // Decodificar el token para obtener el id del usuario
        let decode = jwt.decode(token, process.env.NODE_PRIVATE_KEY);

        Product.findOneAndUpdate({ _id: id, user_id: decode.id }, { name, price, img_url }, (error, product) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json({ message: "producto actualizado" });
            }
        })
    }

    delete = (req, res) => {
        //Obtener id del producto del cuerpo de la petición
        let { id } = req.body;

        // Obtener el token de la peticion
        let token = this.tokenController.getToken(req);

        // Decodificar el token para obtener el id del usuario
        let decode = jwt.decode(token, process.env.NODE_PRIVATE_KEY);
        // Obtener el user id
        let user_id = decode.id
        Product.findOneAndRemove({ _id: id, user_id }, (error, doc) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                if(doc){
                    res.status(200).json({ message: 'producto eliminado con éxito' });
                }else{
                    res.status(200).json({message: "no se eliminó ningún producto"});
                }
            }
        })
    }
}

module.exports = ProductController;