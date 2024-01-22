import { type User } from '@prisma/client'
import { type CreateUserDto } from '../dto/create-user.dto'
import { type UpdateUserDto } from '../dto/update-user.dto'

export interface IUsersRepository {
  createUser: (dto: CreateUserDto) => Promise<User>
  updateUser: (id: string, dto: UpdateUserDto) => Promise<User>
  deleteUser: (id: string) => Promise<User>
  findUserById: (id: string) => Promise<User | null>
  getUsersList: () => Promise<User[] | null>
  findUserByFilter: (filter: any) => Promise<User | null>
}
