import { knex } from '../../db/queryBuilder'
import { DeveloperRepository } from '../../db/repository/developers/DeveloperRepository'
import { UpdateDeveloperController } from './updateDeveloperController'

const developerRepository = new DeveloperRepository(knex)
const updateDeveloperController = new UpdateDeveloperController(developerRepository)

export { updateDeveloperController }
