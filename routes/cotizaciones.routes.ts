import { check, param } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import { existeCotizacion } from "../helpers/db-validators";

const { Router } = require('express');
const { cotizacionesGet, cotizacionesGetById, cotizacionesPost, cotizacionesPut } = require('../controllers/cotizaciones.controller');

const router = Router();

router.get('/', cotizacionesGet);

router.get('/:id', [
    param('id').custom(existeCotizacion),
    validarCampos
], cotizacionesGetById);

router.post('/', [
    check('COT_MENSAJE', 'Debe ingresar el mensaje').notEmpty(),
    check('COT_CANTIDAD_PARTICIPANTES', 'Debe ingresar la cantidad de participantes').notEmpty().isInt(),
    check('CUR_ID', 'Debe ingresar el id curso').notEmpty(),
    check('USU_ID', 'Debe ingresar el usuario id').notEmpty(),
    validarCampos
], cotizacionesPost);

router.put('/:id', [
    param('id').custom(existeCotizacion),
    check('COT_MENSAJE', 'Debe ingresar el mensaje').notEmpty(),
    validarCampos
], cotizacionesPut)
module.exports = router;