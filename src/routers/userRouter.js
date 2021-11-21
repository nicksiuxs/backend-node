const { Router } = require('express');
const { persons } = require('../utils/data')

class UserRouter {

    constructor() {
        // Crear ruta como atributo de la clase
        this.router = Router();
        // Se llama al método para crear las rutas
        this.config()
    }

    config() {
        this.router.get('/users', (req, res) => {
            console.log(persons)
            res.status(200).json(persons).send()
        })
    }
}

module.exports = UserRouter