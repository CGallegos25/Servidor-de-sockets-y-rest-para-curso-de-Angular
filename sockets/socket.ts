import { Socket } from 'socket.io';
import { Mensaje } from '../interface/Mensaje/mensaje';
import { Server as SocketIOServer } from 'socket.io';
import { UsuariosLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/Usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (client: Socket) => {
    const usuario = new Usuario(client.id);
    usuariosConectados.agregar(usuario);
    return usuario;
}

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');

        // Saber que cliente se desconecto con su id
        const usuarioDesconectado = usuariosConectados.borrarUsuario(cliente.id);
        console.log('Usuario desconectado -> ', usuarioDesconectado);
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

// Configuracion de Usuario
export const configurarUsuario = (client: Socket, io: SocketIOServer) => {
    client.on('configurar-usuario', (payload: { nombre: string }, callback: Function ) => {
        usuariosConectados.actualizarNombre(client.id, payload.nombre);
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado.`
        })
    });
}