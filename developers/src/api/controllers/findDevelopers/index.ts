import { knex } from '../../db/queryBuilder'
import { DeveloperRepository } from '../../db/repository/developers/DeveloperRepository'
import { FindDevelopersController } from './findDevelopersController'

const developerRepository = new DeveloperRepository(knex)
const findDevelopersController = new FindDevelopersController(developerRepository)

export { findDevelopersController }
