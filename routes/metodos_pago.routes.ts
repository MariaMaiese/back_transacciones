import { Router } from "express";
import { validarCampos } from "../middlewares/validar-campos";
import {
    existeMetodoPago,
    estadoMetodoPagoEstaDeshabilitado
} from "../helpers/db-validators";
import { check, param } from "express-validator";
const { metodos_pagoGet,
    metodos_pagoGetById,
    metodos_pagoPost,
    metodos_pagoPut,
    metodos_pagoDelete } = require('../controllers/metodos_pago.controller')


const router = Router();

router.get('/', metodos_pagoGet);

router.get('/:id', [
    param('id').custom(existeMetodoPago),
    validarCampos
], metodos_pagoGetById);

router.post('/', [
    check('MPA_NOMBRE', 'Debe ingresar el nombre').notEmpty(),
    validarCampos
], metodos_pagoPost);

router.put('/:id', [
    param('id').custom(existeMetodoPago),
    check('MPA_NOMBRE', 'Debe ingresar el nombre').notEmpty(),
    validarCampos
], metodos_pagoPut);

router.delete('/:id', [
    param('id').custom(existeMetodoPago),
    param('id').custom(estadoMetodoPagoEstaDeshabilitado),
    validarCampos
], metodos_pagoDelete);


module.exports = router;