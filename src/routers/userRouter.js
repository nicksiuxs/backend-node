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

        this.router.post('/users', (req, res) => {
            let { name, lastname, email } = req.body;
            console.table({ name, lastname, email });
            res.status(200).json({ message: "usuario creado" }).send();
        })
    }
}

module.exports = UserRouter