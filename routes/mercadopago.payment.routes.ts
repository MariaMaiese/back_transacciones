import { Router } from "express";
const { createOrder, success, webhook, failure, pending } = require('../controllers/mercadopago.payment.controller')


const router = Router();

router.post('/create-order', createOrder);

router.get('/success', success);
router.get('/failure', failure);
router.get('/pending', pending);
router.post('/webhook', webhook);

module.exports = router;