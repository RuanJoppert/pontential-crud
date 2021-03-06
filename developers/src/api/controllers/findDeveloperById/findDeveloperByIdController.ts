import { IDeveloperRepository, Developer } from '../../../domain'
import { BaseController } from '../baseController'
import { FindDeveloperByIdUseCase } from '../../../application'
import { AppError } from '../../../utils'

export class FindDeveloperByIdController extends BaseController {
  private developerRepository: IDeveloperRepository

  constructor(developerRepository: IDeveloperRepository) {
    super()
    this.developerRepository = developerRepository
  }

  protected async executeImpl(): Promise<void | any> {
    const { id } = this.req.params

    if (!id) {
      return this.error(new AppError.UnprocessableEntity('Please enter a valid ID'))
    }

    const useCase = new FindDeveloperByIdUseCase(this.developerRepository)

    const developersResult = await useCase.execute(id)

    if (developersResult.fail === true) {
      return this.error(developersResult.error)
    }

    return this.ok(developersResult.value.toDTO())
  }
}
