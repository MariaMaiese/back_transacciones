import { Request, Response } from 'express';
import { transaccion } from '../models/transaccion.model';
import { PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';

// Step 1: Import the parts of the module you want to use
import { MercadoPagoConfig, Payment } from 'mercadopago';

const accessToken: any = process.env.MERCADOPAGOACCESSTOKEN


// Step 2: Initialize the client object
const client = new MercadoPagoConfig({ accessToken: accessToken });

const payment = new Payment(client)

const createOrder = async (req: Request, res: Response) => {

    console.log(client)

    const { transaction_amount, description, payment_method_id, payer, additional_info } = req.body

    // Step 4: Create the request object
    const body: PaymentCreateRequest = {
        transaction_amount,
        description,
        payment_method_id,
        payer,
        additional_info
    };

    // Step 5: Make the request
    payment.create({ body, }).then((respuestamp) => {
        console.log(respuestamp)
        res.status(200).json({
            body: respuestamp
        })

    }).catch(console.log);




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

const getPaymentMethods = async (req: Request, res: Response) => {
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
    webhook,
    getPaymentMethods
} 