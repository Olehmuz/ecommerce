import { z } from 'zod'
import { UserRoles } from '../user-roles.enum'

export const CreateUserDtoSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().optional(),
    hashedPassword: z.string(),
    role: z.enum([UserRoles.USER, UserRoles.ADMIN]).optional()
  })
})

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema['shape']['body']>
