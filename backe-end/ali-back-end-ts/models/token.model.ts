import { DataTypes } from "sequelize";
import db from "../db/connection";


const Token = db.define('tokens',{
    accessToken: {
        type: DataTypes.STRING,
    },
    refreshToken: {
        type: DataTypes.STRING,
    },
    expirationDate: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.INTEGER
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

export default Token;