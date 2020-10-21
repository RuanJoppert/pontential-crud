import { knex } from '../../db/queryBuilder'
import { DeveloperRepository } from '../../db/repository/developers/DeveloperRepository'
import { CreateDeveloperController } from './createDeveloperController'

const developerRepository = new DeveloperRepository(knex)
const createDeveloperController = new CreateDeveloperController(developerRepository)

export { createDeveloperController }
