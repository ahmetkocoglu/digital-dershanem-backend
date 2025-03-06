import { Request, Response } from "express";
import ApplicationForm from '../models/application-form.model';

export default class ApplicationFormController {
    async list(req: Request, res: Response) {
        ApplicationForm.find().then((data) => {
            res.status(200).send({ error: false, message: "application form list", data })
        }).catch((error: any) => {
            res.status(200).send({ error: true, message: "application form list error", data: null })
        });
    }

    async create(req: Request, res: Response) {
        await ApplicationForm.create(req.body).then((data) => {
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