// Dependencias
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Módulos
const ConnDb = require('./database/connDb');
const UserRouter = require('./routers/userRouter');
const ProductRouter = require('./routers/productRouter');

class Server {
    constructor() {

        // Conectamos la base de datos
        this.connDb = new ConnDb();
        // Crear aplicación de express
        this.app = express();
        // Llamamos el método de configuración del servidor
        this.config();
    }

    config() {
        // Indicar que se procesará datos en formato JSON
        this.app.use(express.json());
        // Indicar el uso de morgan para el monitoreo de las peticiones http
        this.app.use(morgan());
        // Permitir el uso de CORS ( permitir conexiones de origen cruzado)
        this.app.use(cors());
        // Configurar/almacenar el puerto donde correrá el servidor
        this.app.set('PORT', process.env.port || 3000);
        // Crear una ruta/end point (api) raiz
        let router = express.Router();
        router.get('/', (req, res) => {
            res.status(200).send({ message: "Todo ok" });
        })
        // Traer las rutas del user router
        let userRouter = new UserRouter();
        // Traer las rutas del product router
        let productRouter = new ProductRouter();
        // Añadir la ruta a express
        this.app.use(router);
        // Añadir las rutas del usuario
        this.app.use(userRouter.router);
        // Añadir las rutas del product0
        this.app.use(productRouter.router);
        // Levantar o poner a escuchar el servidor
        this.app.listen(this.app.get('PORT'), () => {
            console.log("servidor corriento por el puerto " + this.app.get('PORT'))
        });
    }
}

new Server();