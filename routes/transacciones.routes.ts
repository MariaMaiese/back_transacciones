import { Router } from "express";
import { validarCampos } from "../middlewares/validar-campos";
import {
    existeEstadoTransaccion,
    existeMetodoPago,
    existeTransaccion,
    existeVenta,
} from "../helpers/db-validators";
import { check, param } from "express-validator";
const { transaccionGet,
    transaccionGetById,
    transaccionPost,
    transaccionPut,
} = require('../controllers/transacciones.controller')


const router = Router();

router.get('/', transaccionGet);

router.get('/:id', [
    param('id').custom(existeTransaccion),
    validarCampos
], transaccionGetById);

router.post('/', [
    check('ETR_ID', 'Debe ingresar el estado de transacción').notEmpty(),
    check('ETR_ID').custom(existeEstadoTransaccion),
    check('MPA_ID', 'Debe ingresar el método de pago ').notEmpty(),
    check('MPA_ID').custom(existeMetodoPago),
    check('VEN_ID', 'Debe ingresar la venta asociada ').notEmpty(),
    check('VEN_ID').custom(existeVenta),
    validarCampos
], transaccionPost);

router.put('/:id', [
    param('id').custom(existeTransaccion),
    check('ETR_ID', 'Debe ingresar el estado de transacción').notEmpty(),
    check('ETR_ID').custom(existeEstadoTransaccion),
    validarCampos
], transaccionPut);


module.exports = router;