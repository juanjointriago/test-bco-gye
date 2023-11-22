import { DataTypes } from "sequelize";
import db from "../db/connection";


const Products = db.define('products',{
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
    },

    status: {
        type: DataTypes.BOOLEAN
    },
    detail: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

export default Products;