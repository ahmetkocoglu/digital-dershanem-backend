import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

module.exports = async (req: Request | any, res: Response, next: NextFunction) => {
    
    const auth = req.headers?.authorization || null // Token ...tokenKey...
    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...']

    if (tokenKey) {
        if (tokenKey[0] == 'Bearer') {
            jwt.verify(tokenKey[1], process.env.ACCESS_KEY || '', (error: any, data: any) => {
                req.user = data
            })
        }
    }
    // console.log('- auth -->> ', auth);
    // console.log('- req.user -->> ', req.user);

    next()
}