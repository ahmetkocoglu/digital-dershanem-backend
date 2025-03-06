import { Application } from "express"
import authRouters from "./auth.route"
import userRouters from "./user.route"
import homeRouters from "./home.route"
import contentRouters from "./content.route"
import categorySlugRouters from "./category-slug.route"
import contentsRouters from "./contents.route"
import contactRouters from "./contact.route"
import applicationFormRouters from "./application-form.route"
import fileRoute from "./file.route";
import priceRoute from "./price.route";
export default class Routes {

    constructor(app: Application) {
        app.use('/api/v1/auth', authRouters)
        app.use('/api/v1/users', userRouters)
        app.use('/api/v1/content', contentRouters)
        app.use('/api/v1/contents', contentsRouters)
        app.use('/api/v1/contact', contactRouters)
        app.use('/api/v1/application-form', applicationFormRouters)
        app.use('/api/v1/file', fileRoute)
        app.use('/api/v1/prices', priceRoute)
        app.use('/api/v1', categorySlugRouters)
        app.use('/', homeRouters)
    }
}
