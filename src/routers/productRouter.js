const { Router } = require('express');
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
        // Crear un producto
        this.router.post('/product', productController.create);
        // Obtener los productos por usuario
        this.router.get('/product', productController.getByUser)
        // Editar un producto
        this.router.put('/product', productController.update);
        // Obtener todos los productos
        this.router.get('/products', productController.getAll);
        // Eliminar un producto por id
        this.router.delete('/product', productController.delete);
    }
}

module.exports = ProductRouter
