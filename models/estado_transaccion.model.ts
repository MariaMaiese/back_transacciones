import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/config";

export class estado_transaccion extends Model {
    static associate(models: any) {
        estado_transaccion.hasMany(models.transaccion, { as: "ETR", foreignKey: "ETR_ID" });
    }
}

estado_transaccion.init({
    ETR_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    ETR_NOMBRE: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    ETR_ESTADO: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize, //We need to pass the connection instance
    modelName: 'estado_transaccion'
});