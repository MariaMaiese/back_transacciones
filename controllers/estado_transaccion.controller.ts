import { Request, Response } from 'express';
import { estado_transaccion } from '../models/estado_transaccion.model';

const estado_transaccionGet = async (req: Request, res: Response) => {
    const estados_transaccion: estado_transaccion[] = await estado_transaccion.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: estados_transaccion
    })
}

const t_usuariosGetById = async (req: Request, res: Response) => {
    const { id } = req.params

    const t_usuario: any = await tipo_usuario.findByPk(id);

    res.status(200).json({
        ok: true,
        status: 200,
        body: t_usuario
    })
}

const t_usuariosPost = async (req: Request, res: Response) => {
    const { TUS_NOMBRE, TUS_DESCRIPCION } = req.body;

    await tipo_usuario.create({ TUS_NOMBRE: TUS_NOMBRE, TUS_DESCRIPCION: TUS_DESCRIPCION, TUS_ESTADO: true })

    res.status(200).json({
        ok: true,
        status: 200,
        message: "Tipo de Usuario creado"
    })
}

const t_usuariosPut = async (req: Request, res: Response) => {

    const { id } = req.params;

    const { TUS_ID, TUS_ESTADO, created_at, updated_at, ...resto } = req.body;

    tipo_usuario.update(resto, {
        where: {
            TUS_ID: id
        }
    })

    res.status(200).json({
        ok: true,
        status: 200,
        message: "Usuario actualizado"
    })
}

const t_usuariosDelete = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { TUS_ESTADO } = req.body;

    console.log(id, TUS_ESTADO)

    tipo_usuario.update({ TUS_ESTADO: TUS_ESTADO }, {
        where: {
            TUS_ID: id
        }
    })

    res.status(200).json({
        ok: true,
        status: 200,
        message: "Usuario actualizado"
    })
}

module.exports = {
    estado_transaccionGet,
    t_usuariosGetById,
    t_usuariosPost,
    t_usuariosPut,
    t_usuariosDelete
} 