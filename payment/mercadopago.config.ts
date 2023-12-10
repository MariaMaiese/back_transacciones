// Step 1: Import the parts of the module you want to use
import { MercadoPagoConfig, MerchantOrder, Payment } from 'mercadopago';

const accessToken: any = process.env.MPACCESSTOKEN

// Step 2: Initialize the client object
const client = new MercadoPagoConfig({ accessToken: accessToken });

export const payment = new Payment(client)