import { Request, Response } from 'express';
import { transaccion } from '../models/transaccion.model';

const transaccionGet = async (req: Request, res: Response) => {
    const transacciones: transaccion[] = await transaccion.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: transacciones
    })
}

const transaccionGetById = async (req: Request, res: Response) => {
    const { id } = req.params

    const transaccionById: any = await transaccion.findByPk(id);

    res.status(200).json({
        ok: true,
        status: 200,
        body: transaccionById
    })
}

const transaccionPost = async (req: Request, res: Response) => {
    const { ETR_ID,
        MPA_ID,
        VEN_ID } = req.body;

    await transaccion.create({
        ETR_ID,
        MPA_ID,
        VEN_ID,
        TRA_FECHA: new Date()
    })

    res.status(200).json({
        ok: true,
        status: 200,
        message: "Transacción creada"
    })
}

const transaccionPut = async (req: Request, res: Response) => {

    const { id } = req.params;

    const { ETR_ID } = req.body;

    await transaccion.update({ ETR_ID }, {
        where: {
            TRA_ID: id
        }
    })

    res.status(200).json({
        ok: true,
        status: 200,
        message: "Transacción actualizada"
    })
}

module.exports = {
    transaccionGet,
    transaccionGetById,
    transaccionPost,
    transaccionPut,
} 