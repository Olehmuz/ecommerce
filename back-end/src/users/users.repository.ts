import { type User } from '@prisma/client'
import { type DatabaseService } from '../core/common/database/database.service'
import { type CreateUserDto } from './dto/create-user.dto'
import { type IUsersRepository } from './intefaces/users-repository.inteface'
import { type UpdateUserDto } from './dto/update-user.dto'

export class UsersRepository implements IUsersRepository {
  constructor (private readonly db: DatabaseService) {}

  async createUser (dto: CreateUserDto): Promise<User> {
    return await this.db.client.user.create({ data: dto })
  }

  async updateUser (id: string, dto: UpdateUserDto): Promise<User> {
    return await this.db.client.user.update({ where: { id }, data: dto })
  }

  async deleteUser (id: string): Promise<User> {
    return await this.db.client.user.delete({ where: { id } })
  }

  async findUserByFilter (filter: any): Promise<User | null> {
    return await this.db.client.user.findFirst({ where: filter })
  }

  async findUserById (id: string): Promise<User | null> {
    return await this.db.client.user.findFirst({ where: { id } })
  }

  async getUsersList (): Promise<User[] | null> {
    return await this.db.client.user.findMany()
  }
}
