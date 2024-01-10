import { PrismaClient } from '@prisma/client'
import { type ILoggerService } from '../../logger/logger.inteface'
import { type IDBService } from './database.inteface'

export class DatabaseService implements IDBService {
  public client: PrismaClient

  constructor (public readonly logger: ILoggerService) {
    const prisma = new PrismaClient()
    this.client = prisma
  }

  async connect (): Promise<void> {
    try {
      await this.client.$connect()
      this.logger.info('[DATABASE SERVICE] client is connected.')
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(`[DATABASE SERVICE] client isn't connected. Error: ${e.message}`)
      }
    }
  }

  async disconnect (): Promise<void> {
    await this.client.$disconnect()
    this.logger.info('[DATABASE SERVICE] client is disconnected.')
  }
}
