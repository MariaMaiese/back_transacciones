import { Request, Response } from 'express';
import { transaccion } from '../models/transaccion.model';
import { PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';

// Step 1: Import the parts of the module you want to use
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';

const accessToken: any = process.env.MERCADOPAGOACCESSTOKEN


// Step 2: Initialize the client object

const client = new MercadoPagoConfig({ accessToken: accessToken, });

const payment = new Payment(client)

const preference = new Preference(client)

const createOrder = async (req: Request, res: Response) => {

    console.log(client)

    const { transaction_amount, description, payment_method_id, payer, items } = req.body

    // Step 4: Create the request object
    const body = {
        transaction_amount,
        description,
        payment_method_id,
        payer,
        items,
        back_urls: {
            failure: 'localhost:8081/mercadopago/failure',
            pending: 'localhost:8081/mercadopago/pending',
            success: 'localhost:8081/mercadopago/success'
        },
        notification_url: "https://acdc-186-107-107-206.ngrok-free.app/mercadopago/webhook",

    };

    // Step 5: Make the request
    preference.create({ body }).then((respuestamp) => {
        console.log(respuestamp)
        return res.status(200).json({
            init_point: respuestamp.init_point
        })

    }).catch(console.log);




}

const success = async (req: Request, res: Response) => {
    const { status, payment_type, payment_id } = req.params


    // http://localhost:8081/mercadopago/success?collection_id=1320040463
    // & collection_status=approved
    //     & payment_id=1320040463
    //         & status=approved
    //             & external_reference=null
    //                 & payment_type=credit_card
    //                     & merchant_order_id=14005041469
    //                         & preference_id=496621230 - c35a0443 - 13bd - 4521 - a327 - d2a1a165ab8a
    //                             & site_id=MLC
    //                                 & processing_mode=aggregator
    //                                     & merchant_account_id=null

    res.status(200).json({
        ok: true,
        status: 200,
        body: req.params
    })
}

const failure = async (req: Request, res: Response) => {
    const { status, payment_type, payment_id } = req.params


    // http://localhost:8081/mercadopago/success?collection_id=1320040463
    // & collection_status=approved
    //     & payment_id=1320040463
    //         & status=approved
    //             & external_reference=null
    //                 & payment_type=credit_card
    //                     & merchant_order_id=14005041469
    //                         & preference_id=496621230 - c35a0443 - 13bd - 4521 - a327 - d2a1a165ab8a
    //                             & site_id=MLC
    //                                 & processing_mode=aggregator
    //                                     & merchant_account_id=null

    res.status(200).json({
        ok: true,
        status: 200,
        body: req.params
    })
}

const pending = async (req: Request, res: Response) => {
    const { status, payment_type, payment_id } = req.params


    // http://localhost:8081/mercadopago/success?collection_id=1320040463
    // & collection_status=approved
    //     & payment_id=1320040463
    //         & status=approved
    //             & external_reference=null
    //                 & payment_type=credit_card
    //                     & merchant_order_id=14005041469
    //                         & preference_id=496621230 - c35a0443 - 13bd - 4521 - a327 - d2a1a165ab8a
    //                             & site_id=MLC
    //                                 & processing_mode=aggregator
    //                                     & merchant_account_id=null

    res.status(200).json({
        ok: true,
        status: 200,
        body: req.params
    })
}

const webhook = async (req: any, res: Response) => {


    const { type } = req.query

    console.log('query: ', req.query)
    console.log('params: ', req.params)

    const id = req.query['data.id'] ? req.query['data.id'] : undefined;

    try {
        if (type === 'payment') {
            const info = await payment.get({
                id,
            }).then((response => {
                if (response.api_response.status === 200) {
                    console.log(response)
                    res.status(204).json({
                        ok: true,
                        status: 200,
                        message: "WEBHOOK, respuesta del payment.get",
                        body: response
                    })
                }
            }));
        }
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            status: 200,
            message: "WEBHOOK",
            body: req.query
        })

    }

}


module.exports = {
    createOrder,
    success,
    webhook,
    failure,
    pending
} 