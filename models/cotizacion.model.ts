import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/config";

export class cotizacion extends Model {
    static associate(models: any) {

    }
}

cotizacion.init({
    COT_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    COT_FECHA: {
        type: DataTypes.DATE,
        allowNull: false
    },
    COT_RESPONDIDA: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    COT_FECHA_RESPUESTA: {
        type: DataTypes.DATE,
        allowNull: false
    },
    COT_MENSAJE: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    COT_CANTIDAD_PARTICIPANTES: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    CUR_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    USU_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize, //We need to pass the connection instance
    modelName: 'cotizacion'
});