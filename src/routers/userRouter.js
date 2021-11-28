const { Router } = require('express');
const UserController = require('../controllers/userController')

class UserRouter {

    constructor() {
        // Crear ruta como atributo de la clase
        this.router = Router();
        // Se llama al método para crear las rutas
        this.config()
    }

    config() {
        // Instancio la clase UserController
        const userController = new UserController();
        // Crear un usuario
        this.router.post('/users', userController.register);
        this.router.post('/user/auth', userController.login);
    }
}

module.exports = UserRouter