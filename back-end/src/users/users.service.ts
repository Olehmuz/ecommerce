import { type User } from '@prisma/client'
import { type CreateUserDto } from './dto/create-user.dto'
import { type IUsersRepository } from './intefaces/users-repository.inteface'
import { type IUsersService } from './intefaces/users-service.inteface'
import { type UpdateUserDto } from './dto/update-user.dto'

export class UsersService implements IUsersService {
  constructor (private readonly usersRepository: IUsersRepository) {}

  async createUser (dto: CreateUserDto): Promise<User> {
    return await this.usersRepository.createUser(dto)
  }

  async getUsersList (): Promise<User[] | null> {
    return await this.usersRepository.getUsersList()
  }

  async findUserById (id: string): Promise<User | null> {
    return await this.usersRepository.findUserById(id)
  }

  async updateUser (id: string, dto: UpdateUserDto): Promise<User> {
    return await this.usersRepository.updateUser(id, dto)
  }

  async deleteUser (id: string): Promise<User> {
    return await this.usersRepository.deleteUser(id)
  }
}
