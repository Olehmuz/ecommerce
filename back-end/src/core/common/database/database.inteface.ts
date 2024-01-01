export interface IDBService {
  client: any
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}
