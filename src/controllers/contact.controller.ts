import { Request, Response } from "express";
import Contact from '../models/contact.model';

export default class ContactController {
    async list(req: Request, res: Response) {
        Contact.find().then((data) => {
            res.status(200).send({ error: false, message: "contact list", data })
        }).catch((error: any) => {
            res.status(200).send({ error: true, message: "contact list error", data: null })
        });
    }

    async create(req: Request, res: Response) {
        await Contact.create(req.body).then((data) => {
            res.status(200).send({ error: false, message: "new row", data })
        }).catch((error: any) => {
            const errorData = Object.keys(error.errors).map(k => {
                return {key: k, val: error.errors[k]['message']}
            })

            const data = [...Object.keys(error.errors)]
            res.status(200).send({ error: true, message: "error", data: data })
        });
    }
}