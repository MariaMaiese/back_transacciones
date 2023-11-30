import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/config";

export class metodo_pago extends Model {
    static associate(models: any) {
        metodo_pago.hasMany(models.transaccion, { as: "MPA", foreignKey: "MPA_ID" });
    }
}

metodo_pago.init({
    MPA_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    MPA_NOMBRE: {
        type: DataTypes.STRING(90),
        allowNull: false
    },
    MPA_ESTADO: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize, //We need to pass the connection instance
    modelName: 'metodo_pago'
});