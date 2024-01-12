import path from 'path'
import fs from 'fs/promises'
import { BadRequestException } from '../core/common/errors/exceptions/bad-request.exception'
import { NotFoundException } from '../core/common/errors/exceptions/not-found.exception'
import { HttpError } from '../core/common/errors/http.error'
import { type IFilesService } from './intefaces/files-service.inteface'

export class FilesService implements IFilesService {
  constructor () {}

  async uploadFile (files: Express.Multer.File[] | {
    [fieldname: string]: Express.Multer.File[]
  } | undefined): Promise<FileData[]> {
    if (!files) throw new BadRequestException('Files for uploading are required.')
    if (!Array.isArray(files)) throw new BadRequestException('Files must have single field name.')

    return files.map(file => ({ filename: file.filename, size: file.size }))
  }

  async deleteFiles (filenames: string[]): Promise<string[]> {
    if (!filenames.length) throw new BadRequestException('Filenames are required.')

    try {
      const deletePromises = filenames.map(async filename => {
        const filePath = path.join(process.cwd(), '/uploads', filename)
        await fs.access(filePath)
        await fs.unlink(filePath)
      })

      await Promise.all(deletePromises)
    } catch (error: any) {
      throw new HttpError(500, error.message as string)
    }

    return filenames
  }
}
