import { Request, Response } from 'express';
import { tipo_dt } from '../models/tipo_dt.model';


const tipos_dtGet = async (req: Request, res: Response) => {
    const tipos_dt: tipo_dt[] = await tipo_dt.findAll()

    res.status(200).json({
        ok: true,
        status: 200,
        body: tipos_dt
    })
}

const tipos_dtGetId = async (req: Request, res: Response) => {
    const { id } = req.params
    const resTipos_dt = await tipo_dt.findByPk(id);
    res.status(200).json({
        ok: true,
        status: 200,
        body: resTipos_dt
    })
}

const tipos_dtPost = async (req: Request, res: Response) => {
    const { TDT_NOMBRE, } = req.body;
    await tipo_dt.create({
        TDT_NOMBRE,
        TDT_ESTADO: true,
    })
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Tipo de documento tributario creado"
    })
}

const tipos_dtPut = async (req: Request, res: Response) => {
    const { id } = req.params
    const { TDT_NOMBRE } = req.body;
    await tipo_dt.update({
        TDT_NOMBRE
    }, {
        where: {
            TDT_ID: id
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Tipo de documento tributario actualizado"
    })
}

const tipos_dtDelete = async (req: Request, res: Response) => {
    const { id } = req.params
    await tipo_dt.update({
        TDT_ESTADO: false
    }, {
        where: {
            TDT_ID: id
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Tipo de documento tributario deshabilitado"
    })
}

module.exports = {
    tipos_dtGet,
    tipos_dtGetId,
    tipos_dtPost,
    tipos_dtPut,
    tipos_dtDelete
}
