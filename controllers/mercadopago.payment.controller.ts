import { Request, Response } from 'express';
import { transaccion } from '../models/transaccion.model';
import { payment } from '../payment/mercadopago.config'

const createOrder = async (req: Request, res: Response) => {

    // Step 4: Create the request object
    const body = {
        transaction_amount: 12.34,
        description: '<DESCRIPTION>',
        payment_method_id: '<PAYMENT_METHOD_ID>',
        payer: {
            email: '<EMAIL>'
        },
    };

    // Step 5: Make the request
    payment.create({ body }).then(console.log).catch(console.log);

}

const success = async (req: Request, res: Response) => {
    const { id } = req.params

    const transaccionById: any = await transaccion.findByPk(id);

    res.status(200).json({
        ok: true,
        status: 200,
        body: transaccionById
    })
}

const webhook = async (req: Request, res: Response) => {
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


module.exports = {
    createOrder,
    success,
    webhook
} 