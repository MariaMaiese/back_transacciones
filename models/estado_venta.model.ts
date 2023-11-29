import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/config";

export class estado_venta extends Model {
    static associate(models: any) {
        estado_venta.hasMany(models.venta, { as: "EVE", foreignKey: "EVE_ID" });
    }
}

estado_venta.init({
    EVE_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    EVE_NOMBRE: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
}, {
    sequelize, //We need to pass the connection instance
    modelName: 'estado_venta'
});