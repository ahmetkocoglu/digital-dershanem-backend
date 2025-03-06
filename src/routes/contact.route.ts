import { Router } from "express"
import ContactController from "../controllers/contact.controller"

class ContactRoutes {
    router = Router()
    controller = new ContactController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {

        this.router.get('/', this.controller.list)
        this.router.post('/',this.controller.create)
    }
}

export default new ContactRoutes().router