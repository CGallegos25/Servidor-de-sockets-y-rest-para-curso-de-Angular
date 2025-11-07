import {Router, Request, Response } from 'express';
import Server from '../classes/server';

// Ocupar para crear servicios REST
const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!!'
    });
});

// recibir los datos del body
router.post('/mensajes', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    };

    const server = Server.instance;
    // in sirve para mandar un mensaje a una persona que se encuentre en el mismo canal o room del socket existente
    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de
    });
});

// recibir los datos de la url
router.post('/mensajes/:id', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    // recuperar valor del valor de id (url)
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    };

    const server = Server.instance;
    
    // in sirve para mandar un mensaje a una persona que se encuentre en el mismo canal o room del socket existente
    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

export default router;