import { type ILoggerService } from '../../logger/logger.inteface'

export interface IDBService {
  logger: ILoggerService
  client: any
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}
