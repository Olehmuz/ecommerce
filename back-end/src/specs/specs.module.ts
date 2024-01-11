import { DependencyModule, injected } from 'brandi'
import { TOKENS } from '../core/container/tokens'
import { SpecsController } from './specs.controller'
import { SpecsRepository } from './specs.repository'
import { SpecsService } from './specs.service'

export const SpecsModule = new DependencyModule()

SpecsModule.bind(TOKENS.specsController).toInstance(SpecsController).inContainerScope()
SpecsModule.bind(TOKENS.specsRepository).toInstance(SpecsRepository).inContainerScope()
SpecsModule.bind(TOKENS.specsService).toInstance(SpecsService).inContainerScope()
SpecsModule.bind(TOKENS.specsPrefix).toConstant('specs')

injected(SpecsRepository, TOKENS.databaseService)
injected(SpecsService, TOKENS.specsRepository)
injected(SpecsController, TOKENS.specsPrefix, TOKENS.loggerService, TOKENS.specsService)
