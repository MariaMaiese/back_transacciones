import express from 'express';
import cors from 'cors';
import { testConection } from '../database/config';
class Server {
    app: any;
    port: any;
    cotizacionesPath: string;
    e_transaccionPath: string;
    e_ventaPath: string;
    metodos_pagoPath: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.cotizacionesPath = '/cotizaciones';
        this.e_transaccionPath = '/estados-transaccion';
        this.e_ventaPath = '/estados-venta';

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

        this.app.use(this.cotizacionesPath, require('../routes/cotizaciones.routes'))
        this.app.use(this.e_transaccionPath, require('../routes/estados_transaccion.routes'))
        this.app.use(this.e_ventaPath, require('../routes/estados_venta.routes'))
        this.app.use(this.metodos_pagoPath, require('../routes/metodos_pago.routes'))


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(' Servidor corriendo en el puerto', this.port)
        })

    }


}


module.exports = Server;