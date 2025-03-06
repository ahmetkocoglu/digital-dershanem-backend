import { Request, Response } from "express";

export default class HomeController {
    async list(req: Request, res: Response) {
        res.status(200).send({ message: "Home" })
    }
}