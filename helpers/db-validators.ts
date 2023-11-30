import { estado_transaccion } from "../models/estado_transaccion.model";
import { cotizacion } from "../models/cotizacion.model";
import { estado_venta } from "../models/estado_venta.model"; import { metodo_pago } from "../models/metodo_pago.model";
import { transaccion } from "../models/transaccion.model";

import { tipo_dt } from "../models/tipo_dt.model";
import { venta } from "../models/venta.model";

const existeEstadoTransaccion = async (id: number) => {
    const existeEstadoTransaccion = await estado_transaccion.findByPk(id);
    if (!existeEstadoTransaccion) {
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

const existeMetodoPago = async (id: number) => {
    const existeMetodoPago = await metodo_pago.findByPk(id);
    if (!existeMetodoPago) {
        throw new Error('El id no existe')
    }
}

const estadoMetodoPagoEstaDeshabilitado = async (id: any) => {
    const estadoMetodoPago: any = await metodo_pago.findByPk(id, {
        attributes: ['MPA_ESTADO']
    })

    if (!estadoMetodoPago.MPA_ESTADO) {
        throw new Error(`El método de pago ya está deshabilitado`);
    }
}

const existeTransaccion = async (id: number) => {
    const existeTransaccion = await transaccion.findByPk(id);
    if (!existeTransaccion) {
        throw new Error('El id no existe')
    }
}

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

const existeTipos_dt = async (id: number) => {
    const existeTipos_dt = await tipo_dt.findByPk(id);
    if (!existeTipos_dt) {
        throw new Error('El id no existe')
    }
}

const tiposDtEstaDeshabilitado = async (id: any) => {
    const estadoTipo_dt: any = await tipo_dt.findByPk(id, {
        attributes: ['TDT_ESTADO']
    })

    if (!estadoTipo_dt.TDT_ESTADO) {
        throw new Error(`El tipo de documento tributario ya está deshabilitado`);
    }
}

const existeVenta = async (id: number) => {
    const existeVenta = await venta.findByPk(id);
    if (!existeVenta) {
        throw new Error('El id no existe')
    }
}

export {
    existeEstadoTransaccion,
    estadoTransacionEstaDeshabilitado,
    existeMetodoPago,
    estadoMetodoPagoEstaDeshabilitado,
    existeCotizacion,
    existeEstados_venta,
    estadosVentaEstaDeshabilitado,
    existeTipos_dt,
    tiposDtEstaDeshabilitado,
    existeVenta,
    existeTransaccion,
}