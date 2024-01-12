export interface IFilesService {
  uploadFile: (file: Express.Multer.File[] | {
    [fieldname: string]: Express.Multer.File[]
  } | undefined
  ) => Promise<any>

  deleteFiles: (filenames: string[]) => Promise<string[]>
}
