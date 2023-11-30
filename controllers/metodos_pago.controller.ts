import { Request, Response } from 'express';
import { metodo_pago } from '../models/metodo_pago.model';

const metodos_pagoGet = async (req: Request, res: Response) => {
    const metodos_pago: metodo_pago[] = await metodo_pago.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: metodos_pago
    })
}

const metodos_pagoGetById = async (req: Request, res: Response) => {
    const { id } = req.params

    const metodo_pagoById: any = await metodo_pago.findByPk(id);

    res.status(200).json({
        ok: true,
        status: 200,
        body: metodo_pagoById
    })
}

const metodos_pagoPost = async (req: Request, res: Response) => {
    const { MPA_NOMBRE } = req.body;

    await metodo_pago.create({ MPA_NOMBRE, MPA_ESTADO: true })

    res.status(200).json({
        ok: true,
        status: 200,
        message: "Método de pago creado"
    })
}

const metodos_pagoPut = async (req: Request, res: Response) => {

    const { id } = req.params;

    const { MPA_NOMBRE } = req.body;

    await metodo_pago.update({ MPA_NOMBRE }, {
        where: {
            MPA_ID: id
        }
    })

    res.status(200).json({
        ok: true,
        status: 200,
        message: "Método de pago actualizado"
    })
}

const metodos_pagoDelete = async (req: Request, res: Response) => {

    const { id } = req.params;

    metodo_pago.update({ MPA_ESTADO: false }, {
        where: {
            MPA_ID: id
        }
    })

    res.status(200).json({
        ok: true,
        status: 200,
        message: "Método de pago eliminado"
    })
}

module.exports = {
    metodos_pagoGet,
    metodos_pagoGetById,
    metodos_pagoPost,
    metodos_pagoPut,
    metodos_pagoDelete
} 