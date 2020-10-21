import { IDeveloperRepository } from '@potential-crud/developers'
import { BaseController } from '../baseController'
import { DeleteDeveloperUseCase } from '@potential-crud/application'

export class DeleteDeveloperController extends BaseController {
  private developerRepository: IDeveloperRepository

  constructor(developerRepository: IDeveloperRepository) {
    super()
    this.developerRepository = developerRepository
  }

  protected async executeImpl(): Promise<void | any> {
    const { id } = this.req.params

    const useCase = new DeleteDeveloperUseCase(this.developerRepository)

    const developersResult = await useCase.execute(id)

    if (developersResult.fail === true) {
      return this.error(developersResult.error)
    }

    return this.deleted()
  }
}
