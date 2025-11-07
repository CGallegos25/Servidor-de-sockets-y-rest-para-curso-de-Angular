import { Usuario } from "./Usuario";

export class UsuariosLista {
    private lista: Usuario[] = [];

    constructor() {}

    // Agregar un usuario a la lista
    public agregar(usuario: Usuario): Usuario {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    // Actualizar el valor de la propiedad.nombre de un registro de la lista
    public actualizarNombre(id: string, nombre: string) {
        for(let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('==== Actualizando usuario ====');
        console.log(this.lista);
    }

    // Obtener lista de usuarios
    public getLista() {
        return this.lista;
    }

    // Regresar un usuario
    public getUsuario(id: string) {
        return this.lista.find(usuario => usuario.id === id);
    }

    // Obtener todos los usuario de una sala en particular
    public getUsuariosEnSala(sala: string) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }

    // Borrar un usuario cuando se desconecta del socket
    public borrarUsuario(id: string) {
        const tempUsuario = this.getUsuario(id);

        this.lista = this.lista.filter(usuario => usuario.id === id);

        return tempUsuario;
    }
}