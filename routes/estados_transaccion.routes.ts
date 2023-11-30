import { Router } from "express";
import { validarCampos } from "../middlewares/validar-campos";
import { existeTipoUsuario } from "../helpers/db-validators";
import { body, check, param } from "express-validator";
const { estado_transaccionGet } = require('../controllers/estado_transaccion.controller')


const router = Router();

// TODO: Agregar validaciones como middlewares [] antes del método del controlador
// TODO: express-validator

router.get('/', estado_transaccionGet);

router.get('/:id', [
    param('id').custom(existeTipoUsuario),
    validarCampos
], t_usuariosGetById);

router.post('/', [
    check('TUS_NOMBRE', 'Debe ingresar el nombre').notEmpty(),
    check('TUS_DESCRIPCION', 'Debe ingresar la descripción').notEmpty(),
    validarCampos
], t_usuariosPost);

router.put('/:id', [
    param('id').custom(existeTipoUsuario),
    validarCampos
], t_usuariosPut);

router.delete('/:id', [
    param('id').custom(existeTipoUsuario),
    check('TUS_ESTADO', "Debe ingresar un estado").notEmpty(),
    validarCampos
], t_usuariosDelete);


module.exports = router;