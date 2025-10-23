import { Socket } from 'socket.io';
import { Mensaje } from '../interface/Mensaje/mensaje';
import { Server as SocketIOServer } from 'socket.io';

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });
};

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: SocketIOServer) => {
    cliente.on('mensaje', ( payload: Mensaje ) => {
        console.log('Mensaje recibido : ', payload);

        // emitir a todos los usuarios los mensaje recibidos que estan conectado al socket
        io.emit('mensaje-nuevo', payload);

    });
};