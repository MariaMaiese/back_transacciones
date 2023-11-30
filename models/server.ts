import express from 'express';
import cors from 'cors';
import { testConection } from '../database/config';
class Server {
    app: any;
    port: any;
    // usuariosPath: string;
    e_transaccionPath: string;
    metodos_pagoPath: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // this.usuariosPath = '/usuarios';
        this.e_transaccionPath = '/estados-transaccion';
        this.metodos_pagoPath = '/metodos-pago';

        // Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await testConection()
    }

    middlewares() {

        // CORS 
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

    }


    routes() {

        // this.app.use(this.usuariosPath, require('../routes/usuarios.routes'))
        this.app.use(this.e_transaccionPath, require('../routes/estados_transaccion.routes'))
        this.app.use(this.metodos_pagoPath, require('../routes/metodos_pago.routes'))


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(' Servidor corriendo en el puerto', this.port)
        })

    }


}


module.exports = Server;