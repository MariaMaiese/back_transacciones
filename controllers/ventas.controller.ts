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

interface ventasPostDTO {
    VEN_MONTO: number,
    VEN_RUT_DT: string,
    EVE_ID: number,
    TDT_ID: number,
    USU_ID: number,
    PRO_ID: number
}


const ventasPost = async (obj: ventasPostDTO) => {
    const { VEN_MONTO, VEN_RUT_DT,
        TDT_ID,
        USU_ID, PRO_ID, } = obj;

    try {
        return await venta.create({
            VEN_MONTO,
            VEN_RUT_DT,
            EVE_ID: 4,
            TDT_ID,
            USU_ID,
            PRO_ID
        })
    } catch (error) {
        return error
    }

}

module.exports = {
    ventasGet,
    ventasGetById,
    ventasPost
}