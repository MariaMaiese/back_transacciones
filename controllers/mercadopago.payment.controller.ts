import { Request, Response } from 'express';
import { transaccion } from '../models/transaccion.model';
import { PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';
const { ventasPost } = require('../controllers/ventas.controller')

// Step 1: Import the parts of the module you want to use
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';

const accessToken: any = process.env.MERCADOPAGOACCESSTOKEN


// Step 2: Initialize the client object

const client = new MercadoPagoConfig({ accessToken: accessToken, });

const payment = new Payment(client)

const preference = new Preference(client)

const createOrder = async (req: Request, res: Response) => {

    const { VEN_MONTO,
        VEN_RUT_DT,
        TDT_ID,
        USU_ID, PRO_ID,
        USU_CORREO,
        PRO_NOMBRE
    } = req.body

    const obj = {
        VEN_MONTO,
        VEN_RUT_DT,
        TDT_ID,
        USU_ID, PRO_ID,
    }

    const ventaDB = await ventasPost(obj)

    // Step 4: Create the request object
    const body = {
        transaction_amount: ventaDB.VEN_MONTO ? ventaDB.VEN_MONTO : undefined,
        description: 'MercadoPagoTransversal OTEC',
        payment_method_id: 'debmaster',
        payer: { email: USU_CORREO },
        items: [{
            id: ventaDB.PRO_ID,
            quantity: 1,
            title: PRO_NOMBRE,
            unit_price: ventaDB.VEN_MONTO ? ventaDB.VEN_MONTO : undefined
        }],
        back_urls: {
            failure: 'localhost:8081/mercadopago/failure',
            pending: 'localhost:8081/mercadopago/pending',
            success: 'localhost:8081/mercadopago/success'
        },
        notification_url: "https://3a94-186-107-107-206.ngrok-free.app/mercadopago/webhook",
        external_reference: ventaDB.VEN_ID

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
    const { external_reference } = req.params


    // // http://localhost:8081/mercadopago/success?collection_id=1320040463
    // collection_id=1320075595
    // &collection_status=approved
    // &payment_id=1320075595
    // &status=approved
    // &external_reference=555
    // &payment_type=credit_card
    // &merchant_order_id=14029613431
    // &preference_id=496621230-0904d0d1-1dde-413e-9684-ad6b909a57c7
    // &site_id=MLC
    // &processing_mode=aggregator
    // &merchant_account_id=null

    // res.redirect('localhost:4200/success')

    res.status(200).json({
        ok: true,
        status: 200,
        params: req.params,
        query: req.query
    })
}

const failure = async (req: Request, res: Response) => {
    const { status, payment_type, payment_id } = req.params


    res.status(200).json({
        ok: true,
        status: 200,
        body: req.params
    })
}

const pending = async (req: Request, res: Response) => {
    const { status, payment_type, payment_id } = req.params


    res.status(200).json({
        ok: true,
        status: 200,
        body: req.params
    })
}

const webhook = async (req: any, res: Response) => {


    const { type } = req.query

    console.log('query: ', req.query)

    const id = req.query['data.id'] ? req.query['data.id'] : undefined;

    try {
        if (type === 'payment') {
            const info = await payment.get({
                id,
            }).then((response => {
                if (response.api_response.status === 200) {
                    console.log(response)
                    const { status, external_reference, transaction_amount } = response

                    const date_last_updated = response.card?.date_last_updated ? response.card?.date_last_updated : undefined;
                    const operacion = response.order?.id ? response.order?.id : undefined;


                    //card.date_last_updated
                    // order: { id: '14034216842', type: 'mercadopago' },
                    // [1]   status: 'approved',
                    // [1]   external_reference: '555',



                    //PUT VENTA
                    // EVE_ID: 3

                    //POST TRANSACCION
                    //TRA_OP: 55
                    // ETR_ID: 3,
                    // MPA_ID: 1,
                    // VEN_ID: external_reference,



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