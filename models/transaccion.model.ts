import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/config";

export class transaccion extends Model {
    static associate(models: any) {
        transaccion.belongsTo(models.estado_transaccion, { as: "ETR", foreignKey: "ETR_ID" });
        transaccion.belongsTo(models.metodo_pago, { as: "MPA", foreignKey: "MPA_ID" });
        transaccion.belongsTo(models.venta, { as: "VEN", foreignKey: "VEN_ID" });
    }
}

transaccion.init({
    TRA_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    TRA_FECHA: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ETR_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    MPA_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    VEN_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize, //We need to pass the connection instance
    modelName: 'transaccion'
});