import { knex } from '../../db/queryBuilder'
import { DeveloperRepository } from '../../db/repository/developers/DeveloperRepository'
import { DeleteDeveloperController } from './deleteDeveloperController'

const developerRepository = new DeveloperRepository(knex)
const deleteDeveloperController = new DeleteDeveloperController(developerRepository)

export { deleteDeveloperController }
