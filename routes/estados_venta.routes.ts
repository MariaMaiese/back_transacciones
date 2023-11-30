import { check, param } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import { estadosVentaEstaDeshabilitado, existeEstados_venta } from "../helpers/db-validators";

const { Router } = require('express');
const { estados_ventaGet, estados_ventaGetById, estados_ventaPost, estados_ventaPut, estados_ventaDelete } = require('../controllers/cotizaciones.controller');

const router = Router();

router.get('/', estados_ventaGet);

router.get('/:id', [
    param('id').custom(existeEstados_venta),
    validarCampos
], estados_ventaGetById);

router.post('/', [
    check('EVE_NOMBRE', 'Debe ingresar el nombre').notEmpty(),
    validarCampos
], estados_ventaPost);

router.put('/:id', [
    param('id').custom(existeEstados_venta),
    check('EVE_NOMBRE', 'Debe ingresar el nombre').notEmpty(),
    validarCampos
], estados_ventaPut)

router.delete('/:id', [
    param('id').custom(existeEstados_venta),
    param('id').custom(estadosVentaEstaDeshabilitado),
    validarCampos
], estados_ventaDelete)

module.exports = router;