import {Request, Response} from "express";
import Content from '../models/content.model';
import Price from '../models/price.model';

export default class ContentController {
    async list(req: Request, res: Response) {
        Content.find().populate([
            {path: 'user', select: 'name email'}
        ]).then((data) => {
            res.status(200).send({error: false, message: "content list", data})
        }).catch((error: any) => {
            res.status(200).send({error: true, message: "content list error", data: null})
        });
    }

    async typeList(req: Request, res: Response) {
        Content.find({type: req.params.type}).then((data) => {
            res.status(200).send({error: false, message: "content list", data})
        }).catch((error: any) => {
            res.status(200).send({error: true, message: "content list error", data: null})
        });
    }

    async row(req: Request, res: Response) {
        Content.findOne({_id: req.params.id}).populate([
            {path: 'user', select: 'name email'}
        ]).then((data) => {
            res.status(200).send({error: false, message: "get content", data})
        }).catch((error: any) => {
            res.status(200).send({error: true, message: "content error", data: null})
        });
    }

    async home(req: Request, res: Response) {
        Content.findOne({type: 'home'}).populate([
            {path: 'user', select: 'name email'}
        ]).then(async (data) => {
            const newData = []
            for (const item of data?.article) {
                if (item.module === 'content') {
                    const article = await Content.findOne({_id: item.item}).then((d: any) => {
                        return d
                    })
                    if (article) {
                        newData.push({
                            ...item,
                            article: {
                                content: article.article.content,
                                title: article.title,
                                description: article.description
                            }
                        })
                    }
                } else if (item.module === 'pricing') {
                    const priceData = []
                    for (const itemPrice of item.article) {
                        const article = await Price.findOne({content: itemPrice.item}).then((d: any) => {
                            return d
                        })
                        const content = await Content.findOne({_id: itemPrice.item}).then((d: any) => {
                            return d
                        })
                        priceData.push({
                            id: article._id,
                            title: content.title,
                            description: content.description,
                            priceTitle: article.title,
                            priceDescription: article.description,
                            price: article.price,
                            features: article.features,
                            unit: article.unit
                        })
                    }

                    if (priceData.length > 0) {
                        newData.push({
                            ...item,
                            article: priceData
                        })
                    } else
                        newData.push(item)
                } else if (item.module === 'contact') {
                    const article = await Content.findOne({type: 'setting'}).then((d: any) => {
                        return d
                    })
                    if (article) {
                        newData.push({
                            ...item,
                            title: item.title,
                            description: item.description,
                            article: {
                                detail: article.article
                            }
                        })
                    }
                } else {
                    newData.push(item)
                }
            }
            res.status(200).send({error: false, message: "get content", data, newData})
        }).catch((error: any) => {
            res.status(200).send({error: true, message: "content error", data: null, errorData: error})
        });
    }

    async setting(req: Request, res: Response) {
        Content.findOne({type: 'setting'}).populate([
            {path: 'user', select: 'name email'}
        ]).then(async (data) => {
            if (data) {
                res.status(200).send({error: false, message: "get content", data})
            } else {
                const id = await Content.create({
                    "id": "",
                    "category": [],
                    "type": "setting",
                    "slug": "setting",
                    "title": "setting",
                    "description": "setting",
                    "tag": "",
                    "article": {
                        "email": "",
                        "phone": "",
                        "address": "",
                        "location": ""
                    },
                    "isActive": true
                }).then((data) => {
                    return data._id
                }).catch((error: any) => {
                    res.status(200).send({error: true, message: "content error", data: error})
                });
                res.status(200).send({error: false, message: "new row", data: {_id: id}})
            }
        }).catch((error: any) => {
            res.status(200).send({error: true, message: "content error", data: null})
        });
    }

    async social(req: Request, res: Response) {
        Content.findOne({type: 'social'}).populate([
            {path: 'user', select: 'name email'}
        ]).then(async (data) => {
            if (data) {
                res.status(200).send({error: false, message: "get content", data})
            } else {
                const id = await Content.create({
                    "id": "",
                    "category": [],
                    "type": "social",
                    "slug": "social",
                    "title": "social",
                    "description": "social",
                    "tag": "",
                    "article": {
                        "facebook": "",
                        "instagram": "",
                        "twitter": "",
                        "youtube": "",
                        "pinterest": "",
                        "linkedin": "",
                        "tiktok": "",
                        "reddit": ""
                    },
                    "isActive": true
                }).then((data) => {
                    return data._id
                }).catch((error: any) => {
                    res.status(200).send({error: true, message: "content error", data: error})
                });
                res.status(200).send({error: false, message: "new row", data: {_id: id}})
            }
        }).catch((error: any) => {
            res.status(200).send({error: true, message: "content error", data: null})
        });
    }

    async typeRow(req: Request, res: Response) {
        Content.findOne({_id: req.params.id, type: req.params.type}).then((data) => {
            res.status(200).send({error: false, message: "get content", data})
        }).catch((error: any) => {
            res.status(200).send({error: true, message: "content error", data: null})
        });
    }

    async categorySlug(req: Request, res: Response) {
        Content.findOne({slug: req.params.slug}).then((data) => {
            res.status(200).send({error: false, message: "get content", data})
        }).catch((error: any) => {
            res.status(200).send({error: true, message: "content error", data: null})
        });
    }

    async create(req: Request, res: Response) {
        await Content.create(req.body).then((data) => {
            res.status(200).send({error: false, message: "new row", data})
        }).catch((error: any) => {
            const errorData = Object.keys(error.errors).map(k => {
                return {key: k, val: error.errors[k]['message']}
            })

            const data = [...Object.keys(error.errors)]
            res.status(200).send({error: true, message: "error", data: data})
        });
    }

    async update(req: Request, res: Response) {
        const data = await Content.updateOne({_id: req.params.id}, req.body, {runValidators: true})
        res.status(200).send({error: !data?.modifiedCount, message: "update row", data: data?.modifiedCount ?? 0})
    }

    async active(req: Request, res: Response) {
        Content.findOne({_id: req.params.id}).then(async (d) => {
            const data = await Content.updateOne({_id: req.params.id}, {isActive: !d?.isActive}, {runValidators: true})
            res.status(200).send({error: !data?.modifiedCount, message: "update row", data: data?.modifiedCount ?? 0})
        }).catch((error: any) => {
            res.status(200).send({error: true, message: "content error", data: null})
        });
    }
}