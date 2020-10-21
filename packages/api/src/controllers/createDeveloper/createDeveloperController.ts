import { IDeveloperRepository } from 'potential-crud-developers'
import { BaseController } from '../baseController'
import { CreateDeveloperUseCase } from 'potential-crud-application'

export class CreateDeveloperController extends BaseController {
  private developerRepository: IDeveloperRepository

  constructor(developerRepository: IDeveloperRepository) {
    super()
    this.developerRepository = developerRepository
  }

  protected async executeImpl(): Promise<void | any> {
    try {
      const { nome, sexo, hobby, datanascimento } = this.req.body

      const useCase = new CreateDeveloperUseCase(this.developerRepository)

      const developerResult = await useCase.execute({ nome, sexo, hobby, datanascimento })

      if (developerResult.fail === true) {
        return this.error(developerResult.error)
      }

      return this.created()
    } catch (err) {
      return this.fail(err.toString())
    }
  }
}
