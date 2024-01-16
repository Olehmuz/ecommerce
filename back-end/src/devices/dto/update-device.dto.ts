import { z } from 'zod'

export const UpdateDeviceDtoSchema = z.object({
  body: z.object({
    colors: z.array(z.object({
      name: z.string(),
      images: z.array(z.string())
    })).optional(),
    model: z.string().optional(),
    price: z.number().int().min(1).optional(),
    description: z.string().min(1).optional(),
    brandId: z.string().optional(),
    categoryId: z.string().optional(),
    specs: z.array(z.string()).optional()
  })
})

export type UpdateDeviceDto = z.infer<typeof UpdateDeviceDtoSchema['shape']['body']>
