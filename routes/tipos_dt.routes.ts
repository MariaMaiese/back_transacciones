import { check, param } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import { existeTipos_dt, tiposDtEstaDeshabilitado } from "../helpers/db-validators";

const { Router } = require('express');
const { tipos_dtGet, tipos_dtGetId, tipos_dtPost, tipos_dtPut, tipos_dtDelete } = require('../controllers/tipos_dt.controller');

const router = Router();

router.get('/', tipos_dtGet);

router.get('/:id', [
    param('id').custom(tipos_dtGetId),
    validarCampos
], tipos_dtGetId);

router.post('/', [
    check('EVE_NOMBRE', 'Debe ingresar el nombre').notEmpty(),
    validarCampos
], tipos_dtPost);

router.put('/:id', [
    param('id').custom(existeTipos_dt),
    check('EVE_NOMBRE', 'Debe ingresar el nombre').notEmpty(),
    validarCampos
], tipos_dtPut)

router.delete('/:id', [
    param('id').custom(existeTipos_dt),
    param('id').custom(tiposDtEstaDeshabilitado),
    validarCampos
], tipos_dtDelete)

module.exports = router;