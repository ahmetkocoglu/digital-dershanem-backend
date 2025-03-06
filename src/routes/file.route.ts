import { Router } from "express"
import FileController from "../controllers/file.controller"

class ContentRoutes {
    router = Router()
    controller = new FileController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {

        this.router.post('/', this.controller.upload)
        this.router.get('/', this.controller.list)
        this.router.get('/:id', this.controller.one)
        this.router.get('/:width/:height/:id', this.controller.one)
        this.router.delete('/:id', this.controller.delete)
    }
}

export default new ContentRoutes().router