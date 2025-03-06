import {NextFunction, Request, Response} from "express";
import User from '../models/user.model';

export default {

    isLogin: async (req: Request | any, res: Response, next: NextFunction) => {
        if (req.user === undefined) {
            res.statusCode = 403
            next(new Error('NoPermission: You must login.'))
        } else {
            const user = await User.findOne({_id: req.user._id});
            if (user && user.isActive) {
                next()
            } else {
                res.statusCode = 403
                next(new Error('NoPermission: You must login.'))
            }
        }
    },

    isStaff: async (req: Request | any, res: Response, next: NextFunction) => {
        if (req.user === undefined) {
            res.statusCode = 403
            next(new Error('NoPermission: You must login.'))
        } else {
            const user = await User.findOne({_id: req.user._id});
            if (user && user.isActive && user.isStaff) {
                next()
            } else {
                res.statusCode = 403
                next(new Error('NoPermission: You must login.'))
            }
        }
    },

    isAdmin: async (req: Request | any, res: Response, next: NextFunction) => {
        if (req.user === undefined) {
            res.statusCode = 403
            next(new Error('NoPermission: You must login and to be Admin.'))
        } else {
            const user = await User.findOne({_id: req.user._id});
            if (user && user.isActive && user.isStaff && user.isAdmin) {
                next()
            } else {
                res.statusCode = 403
                next(new Error('NoPermission: You must login and to be Admin.'))
            }
        }
    },
}