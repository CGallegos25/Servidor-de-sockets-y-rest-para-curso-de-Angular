import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';

import * as socket from '../sockets/socket';

export default class Server {
    public static _instance: Server;

    public app: express.Application;
    public port: number;

    //Propiedad de socketIO
    public io;
    private httpServer;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        // Inicializar la propiedad io pasando la configuracion del servidor que se ejecuta en nodjs
        // socketIO y express no son compatibles por eso se ocupa la clase http

        this.httpServer = createServer(this.app);

        // Configurar io
        this.io = new SocketIOServer(this.httpServer, { cors: { origin: true, credentials: true } });
        this.escucharSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private escucharSockets() {
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {
            console.log('Cliente conectado');

            // Conectar cliente
            socket.conectarCliente(cliente)
            //Configurar-Usuario
            socket.configurarUsuario(cliente, this.io);

            console.log(cliente.id);

            // Mensajes
            socket.mensaje(cliente, this.io);

            // Desconectar
            socket.desconectar(cliente);
        });
    }

    start(callback: () => void) {
        this.httpServer.listen(this.port, callback);
        // this.app.listen(this.port, '', 0, callback);
    }
}