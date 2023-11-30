import { Router } from "express";
import { validarCampos } from "../middlewares/validar-campos";
import { existeTipoTransaccion, estadoTransacionEstaDeshabilitado } from "../helpers/db-validators";
import { check, param } from "express-validator";
const { estados_transaccionGet, estados_transaccionGetById, estados_transaccionPost, estados_transaccionPut, estados_transaccionDelete } = require('../controllers/estado_transaccion.controller')


const router = Router();

router.get('/', estados_transaccionGet);

router.get('/:id', [
    param('id').custom(existeTipoTransaccion),
    validarCampos
], estados_transaccionGetById);

router.post('/', [
    check('ETR_NOMBRE', 'Debe ingresar el nombre').notEmpty(),
    validarCampos
], estados_transaccionPost);

router.put('/:id', [
    param('id').custom(existeTipoTransaccion),
    check('ETR_NOMBRE', 'Debe ingresar el nombre').notEmpty(),
    validarCampos
], estados_transaccionPut);

router.delete('/:id', [
    param('id').custom(existeTipoTransaccion),
    param('id').custom(estadoTransacionEstaDeshabilitado),
    validarCampos
], estados_transaccionDelete);


module.exports = router;