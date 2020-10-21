import Knex from 'knex'
import { Developer, DeveloperProps, IDeveloperRepository } from '../../../../domain'

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
    await this.knex('developers').where({ _id: id }).first().update(devProps)

    return this.findById(id)
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

  async find(filter: Partial<DeveloperProps & { idade: string }> = {}, offset = 0, limit = 10) {
    const developers = this.knex('developers')

    if ('idade' in filter) {
      developers.whereRaw(`TIMESTAMPDIFF(YEAR, datanascimento, CURDATE()) = ${filter.idade}`)

      delete filter.idade
    }

    developers.where(filter).offset(offset).limit(limit).orderBy('developer_id', 'desc')

    return Developer.from(await developers)
  }
}
