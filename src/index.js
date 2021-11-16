const express = require('express');

class Server {
    constructor() {
        // Crear aplicación de express
        this.app = express();
        // Indicar que se procesará datos en formato JSON
        this.app.use(express.json());
        // Configurar/almacenar el puerto donde correrá el servidor
        this.app.set('PORT', process.env.port || 3000);
        // Crear una ruta/end point (api) raiz
        let router = express.Router();
        router.get('/', (req, res) => {
            res.status(200).send();
        })
        // Añadir la ruta a express
        this.app.use(router);
        // Levantar o poner a escuchar el servidor
        this.app.listen(this.app.get('PORT'), () => {
            console.log("servidor corriento por el puerto " + this.app.get('PORT'))
        });
    }
}

new Server();