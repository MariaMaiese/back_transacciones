import { Request, Response } from 'express';
import { estado_venta } from '../models/estado_venta.model';


const estados_ventaGet = async (req: Request, res: Response) => {
    const estadosVenta: estado_venta[] = await estado_venta.findAll()

    res.status(200).json({
        ok: true,
        status: 200,
        body: estadosVenta
    })
}

const estados_ventaGetById = async (req: Request, res: Response) => {
    const { id } = req.params
    const resEstadosVenta = await estado_venta.findByPk(id);
    res.status(200).json({
        ok: true,
        status: 200,
        body: resEstadosVenta
    })
}

const estados_ventaPost = async (req: Request, res: Response) => {
    const { EVE_NOMBRE } = req.body;
    await estado_venta.create({
        EVE_NOMBRE,
        EVE_ESTADO: true,
    })
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Estado de venta creado"
    })
}

const estados_ventaPut = async (req: Request, res: Response) => {
    const { id } = req.params
    const { EVE_NOMBRE } = req.body;
    await estado_venta.update({
        EVE_NOMBRE
    }, {
        where: {
            EVE_ID: id
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Estado de venta actualizado"
    })
}

const estados_ventaDelete = async (req: Request, res: Response) => {
    const { id } = req.params
    await estado_venta.update({
        EVE_ESTADO: false
    }, {
        where: {
            EVE_ID: id
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Estado de venta deshabilitado"
    })
}

module.exports = {
    estados_ventaGet,
    estados_ventaGetById,
    estados_ventaPost,
    estados_ventaPut,
    estados_ventaDelete
}