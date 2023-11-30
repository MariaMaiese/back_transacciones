import { Request, Response } from 'express';
import { venta } from '../models/venta.model';


const ventasGet = async (req: Request, res: Response) => {
    const ventas: venta[] = await venta.findAll()

    res.status(200).json({
        ok: true,
        status: 200,
        body: ventas
    })
}

const ventasGetById = async (req: Request, res: Response) => {
    const { id } = req.params
    const resVenta = await venta.findByPk(id);
    res.status(200).json({
        ok: true,
        status: 200,
        body: resVenta
    })
}

const ventasPost = async (req: Request, res: Response) => {
    const { VEN_MONTO, VEN_RUT_DT,
        EVE_ID, TDT_ID,
        USU_ID, PRO_ID } = req.body;
    await venta.create({
        VEN_MONTO,
        VEN_RUT_DT,
        EVE_ID,
        TDT_ID,
        USU_ID,
        PRO_ID
    })
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Venta creada"
    })
}

module.exports = {
    ventasGet,
    ventasGetById,
    ventasPost
}