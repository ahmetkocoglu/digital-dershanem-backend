import { Router } from "express"
import UserController from "../controllers/user.controller"
import permissions from "../middlewares/permissions";

class UserRoutes {
    router = Router()
    controller = new UserController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get('/', this.controller.list)
        this.router.get('/me', permissions.isLogin, this.controller.me)
    }
}

export default new UserRoutes().router