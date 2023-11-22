import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import RefreshToken from '../models/token.model';
import { verifyJWT } from '../middlewares/token-validator.middleware';
import dotenv from 'dotenv';
dotenv.config();

export const generateJWT = async (email: string) => {
  try {
    //const { email } = user;
    const payload = { email }
    // const accessToken = jwt.sign(payload, `${process.env.SECRETORPRIVATEKEY}`, { expiresIn: "2m" });
    const accessToken = jwt.sign(payload, `${process.env.SECRETORPRIVATEKEY}`, { expiresIn: "1d" });
    const refreshToken = jwt.sign(payload, `${process.env.REFRESH_TOKEN_PRIVATE_KEY}`, { expiresIn: "5d" });
    const userToken = await RefreshToken.findOne({ where: { email } });
    if (userToken) await RefreshToken.destroy({ where: { email } });
    const newRefreshTokenUserData = { email, accessToken, refreshToken, expirationdate: '1d' }
    const userTokenData = await RefreshToken.create(newRefreshTokenUserData);
    userTokenData.save();
    console.debug('New Token was born ⽕');
    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject(error)
  }
}

export const verifyRefreshToken = async (refreshToken: string) => {
  try {
    const privateKey = `${process.env.REFRESH_TOKEN_PRIVATE_KEY}`;
    const RefreshTokenDB = await RefreshToken.findOne({ where: { refreshToken } });
    if (RefreshTokenDB) {
      jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
        if (err) return { error: true, message: 'Invalid refresh token' };
        return {
          tokenDetails,
          error: false,
          message: 'Valid refresh Token',
        }

      })
    }
  } catch (error) {
    console.warn('verifyRefreshToken', error)
    return {
      error
    }
  }
}

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (typeof authorization !== 'undefined') {
      const bearer = authorization.split(' ');
      const token = bearer[1];
      const validToken = verifyJWT(token);
      if (validToken) { return next(); }
      else {
        return res.status(401).json({
          error: 'Invalid Token',
          message: 'Unauthorized Token'
        })
      }
    }
    return res.status(401).json({
      mensajeRetorno: 'No token ',
    });

  } catch (error) {
    return res.status(401).json({
      mensajeRetorno: 'Error Authorizing token ',
      error
    });
  }
}