import { Router } from "express";
import { validarCampos } from "../middlewares/validar-campos";
import { } from "../helpers/db-validators";
import { check, param } from "express-validator";
const { createOrder, success, webhook } = require('../controllers/mercadopago.payment.controller')


const router = Router();

router.post('/create-order', createOrder);

router.get('/success', success);

router.get('/get-payment-methods', success);

router.post('/webhook', webhook);

module.exports = router;