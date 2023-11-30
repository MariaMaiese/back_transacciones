import { body, check, param } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import { existeEstados_venta, existeTipos_dt, existeVenta } from "../helpers/db-validators";
import { validarRut } from "../helpers/moduloEleven";

const { Router } = require('express');
const { ventasGet, ventasGetById, ventasPost } = require('../controllers/ventas.controller');

const router = Router();

router.get('/', ventasGet);

router.get('/:id', [
    param('id').custom(existeVenta),
    validarCampos
], ventasGetById);

router.post('/', [
    check('VEN_MONTO', 'Debe ingresar el monto').notEmpty().isInt(),
    check('VEN_RUT_DT', 'Debe ingresar el rut').notEmpty(),
    body('').custom(validarRut),
    check('EVE_ID', 'Debe ingresar el estado de venta').notEmpty(),
    check('TDT_ID', 'Debe ingresar el tipo de dt').notEmpty(),
    check('USU_ID', 'Debe ingresar el id usuario').notEmpty(),
    check('PRO_ID', 'Debe ingresar el id producto').notEmpty(),
    check('EVE_ID').custom(existeEstados_venta),
    check('TDT_ID').custom(existeTipos_dt),
    validarCampos
], ventasPost);

module.exports = router;