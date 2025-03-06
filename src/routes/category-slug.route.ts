import { Router } from "express"
import ContentController from "../controllers/content.controller"
const permissions = require('../middlewares/permissions')

class ContentRoutes {
    router = Router()
    controller = new ContentController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get('/:category/:slug', this.controller.categorySlug)
    }
}

export default new ContentRoutes().router