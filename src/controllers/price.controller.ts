import {Request, Response} from "express";
import Price from '../models/price.model';

export default class PriceController {
    async list(req: Request, res: Response) {
        Price.find({content: req.params.id}).then((data) => {
            res.status(200).send({error: false, message: "price list", data})
        }).catch((error: any) => {
            res.status(200).send({error: true, message: "price list error", data: null})
        });
    }

    async create(req: Request, res: Response) {
        await Price.create(req.body).then((data) => {
            res.status(200).send({error: false, message: "new row", data})
        }).catch((error: any) => {
            const errorData = Object.keys(error.errors).map(k => {
                return {key: k, val: error.errors[k]['message']}
            })

            const data = [...Object.keys(error.errors)]
            res.status(200).send({error: true, message: "error", data: data})
        });
    }

    async update(req: Request, res: Response) {
        const data = await Price.updateOne({_id: req.params.id}, req.body, {runValidators: true})
        res.status(200).send({error: !data?.modifiedCount, message: "update row", data: data?.modifiedCount ?? 0})
    }

    async delete(req: Request, res: Response) {
        const data = await Price.findByIdAndDelete({_id: req.params.id})
        console.log(data)
        res.status(200).send({error: false, message: "delete row", data: null})
    }
}