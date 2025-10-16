import {Router, Request, Response } from 'express';

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

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

export default router;