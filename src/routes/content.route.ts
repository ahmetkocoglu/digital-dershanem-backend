import { Router } from "express"
import ContentController from "../controllers/content.controller"
import permissions from '../middlewares/permissions'

class ContentRoutes {
    router = Router()
    controller = new ContentController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {

        this.router.get('/', this.controller.list)
        this.router.get('/type/:type', this.controller.typeList)
        this.router.post('/', permissions.isAdmin, this.controller.create)
        this.router.get('/:id', this.controller.row)
        this.router.get('/:type/:id', this.controller.typeRow)
        this.router.put('/:id', permissions.isAdmin, this.controller.update)
        this.router.patch('/:id', permissions.isAdmin, this.controller.update)
        this.router.patch('/active/:id', permissions.isAdmin, this.controller.active)
    }
}

export default new ContentRoutes().router