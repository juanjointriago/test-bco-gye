import { Request, Response } from 'express';
import Product from '../models/products.model';



export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const productData = await Product.findAll({
            where: {
                isActive: true
            }
        })
        if (!productData) {
            return res.status(400).json({
                codigoRetorno: `9999`,
                mensajeRetorno: 'No se encontraron productos registrados',
                records: 0,
                data: [],

            })
        }
        return res.status(200).json({
            codigoRetorno: '0001',
            mensajeRetorno: "Consulta Exitosa",
            data: productData
        })
    } catch (error) {
        return res.status(500).json({
            codigoRetorno: '9999',
            mensajeRetorno: 'Error al extraer datos de productos',
            error
        });
    }
}