import { estado_transaccion } from "../models/estado_transaccion.model";
import { cotizacion } from "../models/cotizacion.model";
import { estado_venta } from "../models/estado_venta.model";

const existeTipoTransaccion = async (id: number) => {
    const existeTipoTransaccion = await estado_transaccion.findByPk(id);
    if (!existeTipoTransaccion) {
        throw new Error('El id no existe')
    }
}

const existeCotizacion = async (id: number) => {
    const existeCotizacion = await cotizacion.findByPk(id);
    if (!existeCotizacion) {
        throw new Error('El id no existe')
    }
}

const estadoTransacionEstaDeshabilitado = async (id: any) => {
    const estadoEstadoTransaccion: any = await estado_transaccion.findByPk(id, {
        attributes: ['ETR_ESTADO']
    })

    if (!estadoEstadoTransaccion.ETR_ESTADO) {
        throw new Error(`El estado de transaccion ya está deshabilitado`);
    }
}

// const existePreguntaSeguridad = async (id: any) => {
//     const existePreguntaSeguridad = await pregunta_seguridad.findByPk(id);
//     if (!existePreguntaSeguridad) {
//         throw new Error(`El id no existe`);
//     }
// }

// const existeRespuesta = async (id: any) => {
//     const existeRespuesta = await respuesta.findByPk(id);
//     if (!existeRespuesta) {
//         throw new Error(`El id no existe`);
//     }
// }
// const existeUsuario = async (id: any) => {
//     const existeUsuario = await usuario.findByPk(id);
//     if (!existeUsuario) {
//         throw new Error(`El id no existe`);
//     }
// }

// //FIXME: Revisar, todavía no funciona

// const existeCombinacion = async (body: any) => {
//     const TUS_ID = body.TUS_ID
//     const USU_ID = body.USU_ID

//     await tipo_usuario_usuario.findAndCountAll({
//         where: {
//             'USU_ID': USU_ID,
//             'TUS_ID': TUS_ID
//         }
//     }).then(x => {
//         if (x.count >= 1) {
//             throw new Error('El usuario ya tiene asignado el tipo de usuario')
//         }
//     })
// }

// const noExisteCombinacion = async (body: any) => {
//     const TUS_ID = body.TUS_ID
//     const USU_ID = body.USU_ID

//     await tipo_usuario_usuario.findAndCountAll({
//         where: {
//             'USU_ID': USU_ID,
//             'TUS_ID': TUS_ID
//         }
//     }).then(x => {
//         if (x.count == 0) {
//             throw new Error('El usuario no tiene asignado el tipo de usuario')
//         }
//     })
// }

// const existeRespuestaUsuario = async (body: any) => {
//     const USU_ID = body.USU_ID
//     const PSE_ID = body.PSE_ID

//     const consulta = await respuesta.findAndCountAll({
//         where: {

//             'USU_ID': USU_ID,
//             'PSE_ID': PSE_ID

//         }
//     }).then(x => {
//         return x.count
//     })

//     console.log(consulta)

//     if (consulta >= 1) {
//         throw new Error('Esta pregunta de seguridad ya está asignada al usuario')
//     }
// }

// const existeMail = async (mail: any) => {
//     const existeMail = await usuario.findAll({
//         where: {
//             'USU_CORREO': mail
//         }
//     })

//     if (existeMail.length > 0) {
//         throw new Error(`El email ya está en uso`);
//     }
// }

// const passwordValido = async (body: any) => {
//     const { USU_CONTRASENA, USU_ULTIMA_PASS } = body
//     const id = body.USU_ID
//     const contrasenaDb: any = await usuario.findByPk(id, {
//         attributes: ['USU_CONTRASENA']
//     })

//     const contrasenaActual = USU_CONTRASENA.toString();
//     const contrasenaDbString = contrasenaDb.USU_CONTRASENA.toString();

//     const valido = await check(contrasenaActual, contrasenaDbString);


//     if (valido) {
//         throw new Error(`Contraseña inválida`);
//     }
//     return !valido

// }

// const UsuarioEstaDeshabilitado = async (id: any) => {
//     const estadoUsuario: any = await usuario.findByPk(id, {
//         attributes: ['USU_ESTADO']
//     })

//     if (!estadoUsuario.USU_ESTADO) {
//         throw new Error(`El usuario ya está deshabilitado`);
//     }
// }
const existeEstados_venta = async (id: any) => {
    const existeEstados_venta = await estado_venta.findByPk(id);
    if (!existeEstados_venta) {
        throw new Error(`El id no existe`);
    }
}

const estadosVentaEstaDeshabilitado = async (id: any) => {
    const estadoUsuario: any = await estado_venta.findByPk(id, {
        attributes: ['EVE_ESTADO']
    })

    if (!estadoUsuario.EVE_ESTADO) {
        throw new Error(`El usuario ya está deshabilitado`);
    }
}

// const existeRespuesta = async (id: any) => {
//     const existeRespuesta = await respuesta.findByPk(id);
//     if (!existeRespuesta) {
//         throw new Error(`El id no existe`);
//     }
// }
// const existeUsuario = async (id: any) => {
//     const existeUsuario = await usuario.findByPk(id);
//     if (!existeUsuario) {
//         throw new Error(`El id no existe`);
//     }
// }

// //FIXME: Revisar, todavía no funciona

// const existeCombinacion = async (body: any) => {
//     const TUS_ID = body.TUS_ID
//     const USU_ID = body.USU_ID

//     await tipo_usuario_usuario.findAndCountAll({
//         where: {
//             'USU_ID': USU_ID,
//             'TUS_ID': TUS_ID
//         }
//     }).then(x => {
//         if (x.count >= 1) {
//             throw new Error('El usuario ya tiene asignado el tipo de usuario')
//         }
//     })
// }

// const noExisteCombinacion = async (body: any) => {
//     const TUS_ID = body.TUS_ID
//     const USU_ID = body.USU_ID

//     await tipo_usuario_usuario.findAndCountAll({
//         where: {
//             'USU_ID': USU_ID,
//             'TUS_ID': TUS_ID
//         }
//     }).then(x => {
//         if (x.count == 0) {
//             throw new Error('El usuario no tiene asignado el tipo de usuario')
//         }
//     })
// }

// const existeRespuestaUsuario = async (body: any) => {
//     const USU_ID = body.USU_ID
//     const PSE_ID = body.PSE_ID

//     const consulta = await respuesta.findAndCountAll({
//         where: {

//             'USU_ID': USU_ID,
//             'PSE_ID': PSE_ID

//         }
//     }).then(x => {
//         return x.count
//     })

//     console.log(consulta)

//     if (consulta >= 1) {
//         throw new Error('Esta pregunta de seguridad ya está asignada al usuario')
//     }
// }

// const existeMail = async (mail: any) => {
//     const existeMail = await usuario.findAll({
//         where: {
//             'USU_CORREO': mail
//         }
//     })

//     if (existeMail.length > 0) {
//         throw new Error(`El email ya está en uso`);
//     }
// }

// const passwordValido = async (body: any) => {
//     const { USU_CONTRASENA, USU_ULTIMA_PASS } = body
//     const id = body.USU_ID
//     const contrasenaDb: any = await usuario.findByPk(id, {
//         attributes: ['USU_CONTRASENA']
//     })

//     const contrasenaActual = USU_CONTRASENA.toString();
//     const contrasenaDbString = contrasenaDb.USU_CONTRASENA.toString();

//     const valido = await check(contrasenaActual, contrasenaDbString);


//     if (valido) {
//         throw new Error(`Contraseña inválida`);
//     }
//     return !valido

// }

// const UsuarioEstaDeshabilitado = async (id: any) => {
//     const estadoUsuario: any = await usuario.findByPk(id, {
//         attributes: ['USU_ESTADO']
//     })

//     if (!estadoUsuario.USU_ESTADO) {
//         throw new Error(`El usuario ya está deshabilitado`);
//     }
// }

export {
    existeTipoTransaccion,
    estadoTransacionEstaDeshabilitado,
    // existePreguntaSeguridad,
    existeCotizacion,
    existeEstados_venta,
    estadosVentaEstaDeshabilitado,
    // existeCombinacion,
    // noExisteCombinacion,
    // existeRespuesta,
    // existeUsuario,
    // existeRespuestaUsuario,
    // existeMail,
    // passwordValido,
    // UsuarioEstaDeshabilitado
}