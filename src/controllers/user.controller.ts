import {Request, Response} from "express";
import User from '../models/user.model';

export default class UserController {
    async list(req: Request, res: Response) {
        await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'P@ssw0rd'
        })
        const data = await User.findOne()
        res.status(200).send({message: "list", data})
    }

    async me(req: Request | any, res: Response) {
        User.findOne({_id: req.user._id}).then((data) => {
            res.status(200).send({
                error: false, message: "get me", data: {
                    id: data?._id,
                    email: data?.email,
                    name: data?.name,
                    isActive: data?.isActive,
                    isStaff: data?.isStaff,
                    isAdmin: data?.isAdmin,
                }
            })
        }).catch((error: any) => {
            res.status(200).send({error: true, message: "content error", data: null})
        });
    }
}
