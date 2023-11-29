import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/config";

export class venta extends Model {
    static associate(models: any) {
        venta.hasMany(models.transaccion, { as: "VEN", foreignKey: "VEN_ID" });
        venta.belongsTo(models.tipo_dt, { as: "TDT", foreignKey: "TDT_ID" });
        venta.belongsTo(models.estado_venta, { as: "EVE", foreignKey: "EVE_ID" });
    }
}

venta.init({
    VEN_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    VEN_MONTO: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    VEN_RUT_DT: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    EVE_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TDT_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    USU_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    PRO_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize, //We need to pass the connection instance
    modelName: 'venta'
});