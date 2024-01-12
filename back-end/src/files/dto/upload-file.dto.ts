import { z } from 'zod'

export const UploadFileDtoSchema = z.object({
  body: z.object({
    name: z.string()
  })
})

export type UploadedFileDto = z.infer<typeof UploadFileDtoSchema['shape']['body']>
