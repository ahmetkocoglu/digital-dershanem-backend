import { Router } from "express"
import ContentController from "../controllers/content.controller"
const permissions = require('../middlewares/permissions')

class ContentsRoutes {
    router = Router()
    controller = new ContentController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {

        this.router.get('/all', this.controller.list)
        this.router.get('/home', this.controller.home)
        this.router.get('/setting', this.controller.setting)
        this.router.get('/social', this.controller.social)
        this.router.get('/:type', this.controller.typeList)
    }
}

export default new ContentsRoutes().router