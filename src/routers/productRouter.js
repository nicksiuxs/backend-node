const { Router } = require('express');

const TokenController = require('../controllers/tokenController');
const ProductController = require('../controllers/productController');

class ProductRouter {

    constructor() {
        // Crear ruta como atributo de la clase
        this.router = Router();
        // Se llama al método para crear las rutas
        this.config()
    }

    config() {
        // Instancio la clase de ProductController
        const productController = new ProductController();

        // <------- Rutas pùblicas ----->
        // Obtener todos los productos
        this.router.get('/products', productController.getAll);

        const tokenController = new TokenController();
        // Middleware
        this.router.use(tokenController.verifyAuth)

        // <----- Rutas privadas ---->
        // Obtener los productos por usuario
        this.router.get('/product', productController.getByUser)
        // Crear un producto
        this.router.post('/product', productController.create);
        // Editar un producto
        this.router.put('/product', productController.update);
        // Eliminar un producto por id
        this.router.delete('/product', productController.delete);
    }
}

module.exports = ProductRouter
