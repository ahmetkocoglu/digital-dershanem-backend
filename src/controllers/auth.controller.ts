import {NextFunction, Request, Response} from "express";
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {

        const { email, password } = req.body
        console.log(email, password)
        if (email && password) {

            const user = await User.findOne({ email })

            const isValid = await bcrypt.compare(password, user?.password ?? "")

            if (user && isValid) {

                if (user.isActive) {

                    // JWT:
                    const access = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.ACCESS_KEY || '', { expiresIn: '1d' })
                    const refresh = jwt.sign({ _id: user._id, password: user.password }, process.env.REFRESH_KEY || '', { expiresIn: '7d' })

                    const loginUser = await User.findOne({ email }).select(['name', 'email', 'token', 'isActive', 'isStaff', 'isAdmin'])
                    if (loginUser) {
                        await User.updateOne({ _id: loginUser._id }, { token: access }, { runValidators: true })
                    }
                    //console.log(loginUser);

                    return res.status(200).send({
                        error: false,
                        token: { access, refresh },
                        user: loginUser,
                    })

                } else {
                    return res.status(401).send({
                        error: true,
                        message: 'This account is not active.'
                    })
                }
            } else {
                return res.status(401).send({
                    error: true,
                    message: 'Wrong email or password.'
                })
            }
        } else {
            return res.status(401).send({
                error: true,
                message: 'Please enter email and password.'
            })
        }
    }
    async register(req: Request, res: Response) {

        const { name, email, password } = req.body

        if (name && email && password) {

            const user = await User.findOne({ email })

            const isValid = user ? await bcrypt.compare(password, user?.password ?? "") : null

            if (isValid) {
                res.status(400).send({
                    error: false,
                    message: 'There is a registration with this e-mail address, please register with a different e-mail address.',
                    data: null
                })
            } else {
                const newUser = await User.create(req.body)
                res.status(201).send({
                    error: false,
                    data: newUser
                })
            }
        } else {
            res.status(400).send({
                error: false,
                message: 'Your transaction failed, please check your information.',
                data: null
            })
        }
    }
    async refresh(req: Request, res: Response) {
        res.status(200).send({ message: "refresh" })
    }
    async logout(req: Request, res: Response) {
        res.status(200).send({ message: "logout" })
    }
}