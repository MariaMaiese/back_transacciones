import { Request, Response } from 'express';
import { estado_transaccion } from '../models/estado_transaccion.model';

const estados_transaccionGet = async (req: Request, res: Response) => {
    const estados_transaccion: estado_transaccion[] = await estado_transaccion.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: estados_transaccion
    })
}

const estados_transaccionGetById = async (req: Request, res: Response) => {
    const { id } = req.params

    const estado_transaccionById: any = await estado_transaccion.findByPk(id);

    res.status(200).json({
        ok: true,
        status: 200,
        body: estado_transaccionById
    })
}

const estados_transaccionPost = async (req: Request, res: Response) => {
    const { ETR_NOMBRE } = req.body;

    await estado_transaccion.create({ ETR_NOMBRE, ETR_ESTADO: true })

    res.status(200).json({
        ok: true,
        status: 200,
        message: "Estado de transaccion creado"
    })
}

const estados_transaccionPut = async (req: Request, res: Response) => {

    const { id } = req.params;

    const { ETR_NOMBRE } = req.body;

    await estado_transaccion.update({ ETR_NOMBRE }, {
        where: {
            ETR_ID: id
        }
    })

    res.status(200).json({
        ok: true,
        status: 200,
        message: "Estado de transaccion actualizado"
    })
}

const estados_transaccionDelete = async (req: Request, res: Response) => {

    const { id } = req.params;

    estado_transaccion.update({ ETR_ESTADO: false }, {
        where: {
            ETR_ID: id
        }
    })

    res.status(200).json({
        ok: true,
        status: 200,
        message: "Estado de transaccion eliminado"
    })
}

module.exports = {
    estados_transaccionGet,
    estados_transaccionGetById,
    estados_transaccionPost,
    estados_transaccionPut,
    estados_transaccionDelete
} 