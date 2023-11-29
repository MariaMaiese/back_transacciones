import { Sequelize } from 'sequelize';
import fs from 'fs';

const DBPORTDATABASE: any = process.env.DBPORTDATABASE
const AZUREDBHOSTNAME: any = process.env.AZUREDBHOSTNAME
const DBUSERNAME: any = process.env.DBUSERNAME
const DBPASSWORD: any = process.env.DBPASSWORD
const DBDATABASE: any = process.env.DBDATABASE


const sequelize = new Sequelize(DBDATABASE, DBUSERNAME, DBPASSWORD, {
    host: AZUREDBHOSTNAME,
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            ca: fs.readFileSync('DigiCertGlobalRootCA.crt.pem'),
            rejectUnauthorized: true
        },
        port: DBPORTDATABASE
    },
    define: {
        freezeTableName: true
    }
},);
const testConection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the DBDATABASE:', error);
    }
};

export { sequelize, testConection };
