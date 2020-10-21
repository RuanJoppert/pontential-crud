import { IDeveloperRepository, Developer } from '@potential-crud/developers'
import { BaseController } from '../baseController'
import { FindDeveloperUseCase } from '@potential-crud/application'

export class FindDevelopersController extends BaseController {
  private developerRepository: IDeveloperRepository

  constructor(developerRepository: IDeveloperRepository) {
    super()
    this.developerRepository = developerRepository
  }

  protected async executeImpl(): Promise<void | any> {
    const { page = 1, pageSize = 10, ...filter } = this.req.query

    const limit = Number(pageSize)
    const offset = (Number(page) - 1) * limit

    const useCase = new FindDeveloperUseCase(this.developerRepository, ['sexo', 'nome', 'hobby', 'idade'])

    const developersResult = await useCase.execute(filter, offset, limit)

    if (developersResult.fail === true) {
      return this.error(developersResult.error)
    }

    return this.list(Developer.toDTO(developersResult.value), developersResult.value.length ? 200 : 404)
  }
}
