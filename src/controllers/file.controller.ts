import {Request, Response} from "express";
import {UploadedFile} from 'express-fileupload';
import fs from "fs";
import FileModel from '../models/file.model';
import sharp from "sharp";

export default class FileController {
    async upload(req: Request, res: Response) {
        if (!req.files) {
            return res.status(422).send('No files were uploaded');
        }
        const uploadedFile: UploadedFile | UploadedFile[] = req.files.upload;
        let uploadPath = process.cwd() + "/uploads/"

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(process.cwd() + "/uploads/")
        }

        let newFileName = ''
        if ("mv" in uploadedFile) {
            newFileName = new Date().getTime() + (uploadedFile.mimetype === 'image/jpeg' ? '.jpg' : (uploadedFile.mimetype === 'image/webp' ? '.webp' : (uploadedFile.mimetype === 'image/png' ? '.png' : '')))
            uploadedFile.mv(uploadPath + newFileName, async function (err) {
                if (!err) {
                    await FileModel.create({
                        originalName: uploadedFile.name,
                        fileName: newFileName,
                        isActive: true
                    }).then((data) => {
                        // console.log(data)
                    }).catch((error: any) => {
                        // console.log(error)
                    });
                }
            })
        }

        res.status(200).send({error: false, message: "file upload", data: {name: newFileName, original: ("name" in uploadedFile ? uploadedFile?.name : '')}})
    }
    async list(req: Request, res: Response) {
        FileModel.find().then((data) => {
            res.status(200).send({error: false, message: "file list", data})
        }).catch((error: any) => {
            res.status(200).send({error: true, message: "file list error", data: null})
        });
    }
    async one(req: Request, res: Response) {
        const {width, height, id} = req.params

        FileModel.find({_id: id}).then(async (_data) => {
            try {
                const uploadPath = process.cwd() + "/uploads/" + _data[0].fileName

                const data = fs.readFileSync(uploadPath)
                const image = sharp(data.buffer)
                const metadata = await image.metadata()

                const transform = sharp(uploadPath).toFormat('webp').resize(Number(width ?? metadata.width), Number(height ?? metadata.height))

                res.type('webp')
                res.status(200)
                return transform.pipe(res)
            } catch (e) {
                return res.status(200).send(e)
            }
        }).catch((error: any) => {
            return res.status(200).send(error)
        });
    }
    async delete(req: Request, res: Response) {
        const {id} = req.params
        FileModel.find({_id: id}).then(async (_data) => {
            const uploadPath = process.cwd() + "/uploads/" + _data[0].fileName
            fs.unlink(uploadPath, (err) => {
                if (err)
                    res.status(200).send({error: true, message: "file deleted error"})
                else {
                    FileModel.deleteOne({_id: id}).then((data) => {
                        res.status(200).send({error: false, message: "file deleted", data})
                    }).catch((error: any) => {
                        res.status(200).send({error: true, message: "no file", data: null})
                    });
                }
            });
        }).catch((error: any) => {
            res.status(200).send({error: true, message: "no data"})
        })
    }
}