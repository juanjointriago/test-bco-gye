import { DataTypes } from "sequelize";
import db from "../db/connection";


const User = db.define('users',{
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING(500)
    },
    planId: {
        type: DataTypes.INTEGER
    },
    phoneNumber: {
        type: DataTypes.STRING(13)
    },
    role: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

export default User;