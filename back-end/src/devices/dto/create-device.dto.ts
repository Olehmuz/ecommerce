import { z } from 'zod'

export const CreateDeviceDtoSchema = z.object({
  body: z.object({
    images: z.array(z.string()),
    model: z.string(),
    price: z.number().int().min(1),
    description: z.string().min(1),
    brandId: z.string(),
    categoryId: z.string(),
    specs: z.array(z.string()).optional()
  })
})

export type CreateDeviceDto = z.infer<typeof CreateDeviceDtoSchema['shape']['body']>
