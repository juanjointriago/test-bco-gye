import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { generateJWT } from './refresh-token.controller';
import Token from '../models/token.model';
import { generatePassword } from '../helpers/password.helper';


export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)

        const user = await User.findOne({ where: { email, isActive: true } });
        if (!user) {
            console.log('here bad request')
            return res.status(401).json({
                codigoRetorno: '8888',
                mensajeRetorno: 'El usuario ingresado no existe',
                error: 'El usuario ingresado no existe',
            })
        }
        const jsonUser = user!.toJSON();
        console.debug(jsonUser.email);
        const isMatch = bcrypt.compareSync(password, jsonUser.password);
        if (!isMatch) {
            return res.status(401).json({
                codigoRetorno: '9999',
                mensajeRetorno: 'Credenciales incorrectas',
                error: 'Credenciales incorrectas',
            })
        }
        const { accessToken, refreshToken } = await generateJWT(jsonUser.email);

        return res.status(200).json({
            error: false,
            mensajeRetorno: 'Acceso Correcto 🚀',
            accessToken,
            refreshToken,
            user,
        });
    } catch (error) {
        console.warn(error);
        return res.status(500).json({
            error: 'Error al ingresar al sistema',
            mensajeRetorno: `Error:  ${error}`,
        })
    }
}



export const refreshToken = async (req: Request, res: Response) => {
    const privateKey = `${process.env.REFRESH_TOKEN_PRIVATE_KEY}`;
    try {
        const { refreshToken } = req.body;
        if (!!!refreshToken) return res.status(404).json({ error: 'No ha enviado Token', mensajeRetorno: 'No ha enviado un token' })
        // console.log('-----si llega el token :', refreshToken)
        if (!refreshToken) return res.status(403).json({ error: 'No refresh token reciped', mensajeRetorno: 'Refresh tokes is required' })
        const refreshTokenDB = await Token.findOne({ where: { refreshToken } });//ok
        if (!refreshTokenDB) return res.status(403).json({ error: 'Not Found', mensajeRetorno: 'RefreshToken no in database ' });
        const jsonDataRefreshtoken = refreshTokenDB!.toJSON();
        const { email } = jsonDataRefreshtoken;
        if (refreshTokenDB) {
            jwt.verify(refreshToken, privateKey, async (err: any, tokenDetails: any) => {
                if (err) return { error: true, message: err };
                //const payload = { id: tokenDetails.id, email }
                // console.log({ tokenDetails });
                const payload = { email }
                // const accessToken = jwt.sign(payload, `${process.env.SECRETORPRIVATEKEY}`, { expiresIn: "2m" });
                const accessToken = jwt.sign(payload, `${process.env.SECRETORPRIVATEKEY}`, { expiresIn: "1d" });
                const refreshToken = jwt.sign(payload, `${process.env.REFRESH_TOKEN_PRIVATE_KEY}`, { expiresIn: "1d" });
                await Token.destroy({ where: { email } });
                const newRefreshTokenUserData = { email, token: accessToken, refreshToken, expirationdate: '7d' }
                const userTokenData = await Token.create(newRefreshTokenUserData);
                userTokenData.save();
                console.log('Updated Refresh token was Born ⽕')
                return res.status(200).json({
                    error: false,
                    accessToken,
                    refreshToken,
                    mensajeRetorno: 'Refresh Token created success'
                })
            })

        }
    } catch (error) {
        return res.status(503).json({
            error
        })
    }
}

export const signUp = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const user = await User.findOne({ where: { email: body.email, isActive: true, } });
        if (user) {
            return res.status(200).json({
                mensajeRetorno: 'Este usuario ya existe',
                records: 0,
                data: user,
                error: true,
            })
        }

        body.password = await generatePassword(body.password);
        // console.debug('Password crypted');
        const createUser = await User.create(body);
        createUser.save();
        const token = await generateJWT(body.email);
        const { accessToken, refreshToken } = token;
        return res.status(200).json({
            error: false,
            mensajeRetorno: 'Registro exitoso',
            accessToken,
            refreshToken,
            data: body,
        })

    } catch (error) {
        console.warn(error)
        res.status(500).json({
            mensajeRetorno: 'Error  Registrando usuario',
            error: true ,
            records: 0,
            data: []
        })
    }
}



export const signOut = async (req: Request, res: Response) => {
    const { token } = req.body;
    try {
        const userToken = await Token.findOne({ where: { token } });
        console.debug(!!userToken)
        if (!userToken) return res.status(200).json({
            error: false,
            mensajeRetorno: 'Token invalido Sesion CErrada por seguridad!💩',
            records: 0,
            data: userToken
        });
        await Token.destroy({ where: { token } });
        res.status(200).json({
            error: false,
            mensajeRetorno: 'Salida exitosa ',
            records: 0,
            data: []
        })
    } catch (error) {
        return res.status(500).json({
            error,
            records: 0,
            data: []
        })
    }
}