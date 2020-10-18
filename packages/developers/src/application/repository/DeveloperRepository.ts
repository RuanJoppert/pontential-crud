import Knex from 'knex'
import { Developer, DeveloperProps } from '../../domain/entity/Developer'
import { IDeveloperRepository } from '../../domain/repository/DeveloperRepository'

export class DeveloperRepository implements IDeveloperRepository {
  private knex: Knex

  constructor(knex: Knex) {
    this.knex = knex
  }

  async create(devProps: DeveloperProps, id?: string) {
    const developerResult = Developer.create(devProps, id)

    if (developerResult.fail === true) {
      return null
    }

    await this.knex('developers').insert(developerResult.value)

    return this.findById(developerResult.value.id)
  }

  async update(devProps: Partial<DeveloperProps>, id: string) {
    const developer = await this.findById(id)

    if (!developer) {
      return null
    }

    const developerResult = Developer.from(developer).update(devProps)

    if (developerResult.fail === true) {
      return null
    }

    await this.knex('developers').where({ _id: id }).first().update(developerResult.value)

    return this.findById(developerResult.value.id)
  }

  async removeById(id: string) {
    const devs = await this.knex('developers').where({ _id: id }).first().del()

    if (devs === 0) {
      return false
    }

    return true
  }

  async findById(id: string): Promise<Developer> {
    const developer = await this.knex('developers').where({ _id: id }).first()

    if (!developer) {
      return null
    }

    return Developer.from(developer)
  }

  async find(filter: Partial<DeveloperProps> = {}, offset = 0, size = 10) {
    const devs = await this.knex('developers').where(filter).offset(offset).limit(size).orderBy('created_at')

    return Developer.from(devs)
  }
}
