import { z } from 'zod'
import { UserRoles } from '../user-roles.enum'

export const UpdateUserDtoSchema = z.object({
  body: z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    hashedPassword: z.string().optional(),
    role: z.enum([UserRoles.USER, UserRoles.ADMIN]).optional()
  })
})

export type UpdateUserDto = z.infer<typeof UpdateUserDtoSchema['shape']['body']>
