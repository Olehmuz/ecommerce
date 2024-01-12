import { DependencyModule, injected } from 'brandi'
import { DatabaseService } from '../core/common/database/database.service'
import { TOKENS } from '../core/container/tokens'
import { FilesController } from './files.controller'
import { FilesService } from './files.service'

export const FilesModule = new DependencyModule()

FilesModule.bind(TOKENS.filesController).toInstance(FilesController).inContainerScope()
FilesModule.bind(TOKENS.filesService).toInstance(FilesService).inContainerScope()
FilesModule.bind(TOKENS.filesPrefix).toConstant('files')

injected(FilesService)
injected(FilesController, TOKENS.filesPrefix, TOKENS.loggerService, TOKENS.filesService)
