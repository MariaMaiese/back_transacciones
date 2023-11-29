import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/config";

export class tipo_dt extends Model {
    static associate(models: any) {
        tipo_dt.hasMany(models.venta, { as: "TDT", foreignKey: "TDT_ID" });
    }
}

tipo_dt.init({
    TDT_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    TDT_NOMBRE: {
        type: DataTypes.STRING(90),
        allowNull: false
    },
}, {
    sequelize, //We need to pass the connection instance
    modelName: 'tipo_dt'
});