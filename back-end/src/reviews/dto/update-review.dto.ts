import { z } from 'zod'

export const UpdateReviewDtoSchema = z.object({
  body: z.object({
    comment: z.string().optional(),
    rating: z.number().int().min(1).max(5).optional(),
    deviceId: z.string().optional()
  })
})

export type UpdateReviewDto = z.infer<typeof UpdateReviewDtoSchema['shape']['body']>
