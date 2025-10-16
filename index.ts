import Server from "./classes/server";
import router from "./routes/router";
import { SERVER_PORT } from "./global/enviroment";

import bodyParser from "body-parser";
import cors from 'cors';

const server = new Server();

//bodyParser nos servira para recibir datos del body enviados en las peticiones http
server.app.use(bodyParser.urlencoded({ extended: true }));
// recibirlo como json
server.app.use(bodyParser.json());

//Configuración de CORS siempre se debe configurar antes de las rutas
server.app.use(cors({ origin: true, credentials: true }));

// Inicializar esta ruta como principio de la aplicación para las ruta de servicios
server.app.use('/', router);

 server.start(() => {
     console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
 });