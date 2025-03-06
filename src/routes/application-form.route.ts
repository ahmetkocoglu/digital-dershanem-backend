import { Router } from "express"
import ApplicationFormController from "../controllers/application-form.controller"

class ApplicationFormRoutes {
    router = Router()
    controller = new ApplicationFormController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {

        this.router.get('/', this.controller.list)
        this.router.post('/',this.controller.create)
    }
}

export default new ApplicationFormRoutes().router