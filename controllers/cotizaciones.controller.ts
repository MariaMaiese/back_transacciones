import { Request, Response } from 'express';
import { cotizacion } from '../models/cotizacion.model';

const cotizacionesGet = async (req: Request, res: Response) => {
    const cotizaciones: cotizacion[] = await cotizacion.findAll()

    res.status(200).json({
        ok: true,
        status: 200,
        body: cotizaciones
    })
}

const cotizacionesGetById = async (req: Request, res: Response) => {
    const { id } = req.params
    const resCotizacion = await cotizacion.findByPk(id);
    res.status(200).json({
        ok: true,
        status: 200,
        body: resCotizacion
    })
}

const cotizacionesPost = async (req: Request, res: Response) => {
    const { COT_MENSAJE, COT_CANTIDAD_PARTICIPANTES, CUR_ID, USU_ID } = req.body;
    await cotizacion.create({
        COT_FECHA: new Date(),
        COT_RESPONDIDA: false,
        COT_FECHA_RESPUESTA: new Date(),
        COT_MENSAJE: COT_MENSAJE,
        COT_CANTIDAD_PARTICIPANTES: COT_CANTIDAD_PARTICIPANTES,
        CUR_ID: CUR_ID,
        USU_ID: USU_ID

    })
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Cotización creada"
    })
}

const cotizacionesPut = async (req: Request, res: Response) => {
    const { id } = req.params
    const { COT_MENSAJE } = req.body;
    await cotizacion.update({
        COT_RESPONDIDA: true,
        COT_FECHA_RESPUESTA: new Date(),
        COT_MENSAJE: COT_MENSAJE
    }, {
        where: {
            COT_ID: id
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Cotización actualizada"
    })
}

module.exports = {
    cotizacionesGet,
    cotizacionesGetById,
    cotizacionesPost,
    cotizacionesPut
}