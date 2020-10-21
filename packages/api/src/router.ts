import express, { Router } from 'express'
import {
  findDevelopersController,
  createDeveloperController,
  findDevelopersByIdController,
  updateDeveloperController,
  deleteDeveloperController
} from './controllers'
const developerRouter: Router = express.Router()

developerRouter.get('/', (req, res, next) => findDevelopersController.execute(req, res, next))
developerRouter.get('/:id', (req, res, next) => findDevelopersByIdController.execute(req, res, next))
developerRouter.post('/', (req, res, next) => createDeveloperController.execute(req, res, next))
developerRouter.put('/:id', (req, res, next) => updateDeveloperController.execute(req, res, next))
developerRouter.delete('/:id', (req, res, next) => deleteDeveloperController.execute(req, res, next))

export { developerRouter }
