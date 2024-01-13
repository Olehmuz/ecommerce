import { z } from 'zod'

export const CreateReviewDtoSchema = z.object({
  body: z.object({
    comment: z.string(),
    rating: z.number().int().min(1).max(5),
    deviceId: z.string()
  })
})

export type CreateReviewDto = z.infer<typeof CreateReviewDtoSchema['shape']['body']>
