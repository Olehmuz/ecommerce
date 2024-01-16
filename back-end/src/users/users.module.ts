import { DependencyModule, injected } from 'brandi'
import { TOKENS } from '../core/container/tokens'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'

export const UsersModule = new DependencyModule()

UsersModule.bind(TOKENS.usersController).toInstance(UsersController).inContainerScope()
UsersModule.bind(TOKENS.usersRepository).toInstance(UsersRepository).inContainerScope()
UsersModule.bind(TOKENS.usersService).toInstance(UsersService).inContainerScope()
UsersModule.bind(TOKENS.usersPrefix).toConstant('users')

injected(UsersRepository, TOKENS.databaseService)
injected(UsersService, TOKENS.usersRepository)
injected(UsersController, TOKENS.usersPrefix, TOKENS.loggerService, TOKENS.usersService)
