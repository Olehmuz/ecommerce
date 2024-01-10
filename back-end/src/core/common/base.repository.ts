import { type Prisma } from '@prisma/client'

interface Dict { [k: string]: any }

interface DictWithId {
  id?: number
  [k: string]: any
}

interface SelectWithId {
  id?: boolean
  [k: string]: any
}

interface Delegate {
  findMany: (arg: {
    select?: SelectWithId | null
    include?: Dict | null
    where?: Dict
    orderBy?: Prisma.Enumerable<any>
    cursor?: Dict
    take?: number
    skip?: number
    distinct?: Prisma.Enumerable<any>
  }) => any

  findFirst: (arg: {
    select?: SelectWithId | null
    include?: Dict | null
    where?: DictWithId
    orderBy?: Prisma.Enumerable<any>
    cursor?: Dict
    take?: number
    skip?: number
    distinct?: Prisma.Enumerable<any>
  }) => any

  create: (arg: {
    select?: SelectWithId | null
    include?: Dict | null
    data: any
  }) => any

  update: (arg: {
    select?: SelectWithId | null
    include?: Dict | null
    data: any
    where: DictWithId
  }) => any

  delete: (arg: {
    select?: SelectWithId | null
    include?: Dict | null
    where: DictWithId
  }) => any

  [k: string]: any
}

type FindManyWhereArg<T extends Delegate> = Parameters<T['findMany']>[0]['where']
type FindFirstWhereArg<T extends Delegate> = Parameters<T['findFirst']>[0]['where']
type CreateDataArg<T extends Delegate> = Parameters<T['create']>[0]['data']
type UpdateDataArg<T extends Delegate> = Parameters<T['update']>[0]['data']

export abstract class BaseRepository <T extends Delegate> {
  abstract get delegate (): T

  getMany (where: FindManyWhereArg<T>): T {
    return this.delegate.findMany({ where })
  }

  getOne (where: FindFirstWhereArg<T>): T {
    return this.delegate.findFirst({ where })
  }

  create (data: CreateDataArg<T>): T {
    return this.delegate.create({ data })
  }

  update (id: number, data: UpdateDataArg<T>): T {
    return this.delegate.update({ data, where: { id } })
  }

  delete (id: number): T {
    return this.delegate.delete({ where: { id } })
  }
}
