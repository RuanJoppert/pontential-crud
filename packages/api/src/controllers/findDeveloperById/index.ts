import { knex } from '../../db/queryBuilder'
import { DeveloperRepository } from '../../db/repository/developers/DeveloperRepository'
import { FindDeveloperByIdController } from './findDeveloperByIdController'

const developerRepository = new DeveloperRepository(knex)
const findDevelopersByIdController = new FindDeveloperByIdController(developerRepository)

export { findDevelopersByIdController }
