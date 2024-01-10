import { DependencyModule, injected } from 'brandi'
import { TOKENS } from '../core/container/tokens'
import { AuthController } from './auth.controller'

export const AuthModule = new DependencyModule()

AuthModule.bind(TOKENS.authController).toInstance(AuthController).inContainerScope()
AuthModule.bind(TOKENS.authPrefix).toConstant('auth')

injected(AuthController, TOKENS.authPrefix, TOKENS.loggerService)
