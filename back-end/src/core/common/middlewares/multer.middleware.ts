import fs from 'fs'
import path from 'path'
import { json } from 'body-parser'
import multer from 'multer'
import { v4 as uuid } from 'uuid'
import { HttpError } from '../errors/http.error'
import { type IMiddleware } from './middleware.inteface'

function checkFileType (file: Express.Multer.File, cb: multer.FileFilterCallback): any {
  // Allowed file types
  const filetypes = /jpeg|jpg|png|gif/
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    cb(null, true)
  } else {
    cb(new HttpError(400, 'Allowed file types: jpeg|jpg|png|gif'))
  }
}

export class MulterMiddleware implements IMiddleware {
  private readonly storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadsDir = path.join(process.cwd(), '/uploads')
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir)
      }
      cb(null, uploadsDir)
    },
    filename: function (req, file, cb) {
      cb(null, uuid() + path.extname(file.originalname))
    }
  })

  public readonly multer = multer({
    storage: this.storage,
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
    }
  })

  execute = this.multer.array('files', 10)
}
