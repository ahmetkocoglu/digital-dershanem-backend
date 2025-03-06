import { Router } from "express"
import PriceController from "../controllers/price.controller"
const permissions = require('../middlewares/permissions')

class PriceRoutes {
    router = Router()
    controller = new PriceController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {

        this.router.get('/', this.controller.list)
        this.router.get('/:id', this.controller.list)
        this.router.post('/', this.controller.create)
        this.router.put('/:id', this.controller.update)
        this.router.delete('/:id', this.controller.delete)
    }
}

export default new PriceRoutes().router