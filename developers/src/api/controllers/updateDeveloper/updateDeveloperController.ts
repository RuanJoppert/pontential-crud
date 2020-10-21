import { IDeveloperRepository } from '../../../domain'
import { BaseController } from '../baseController'
import { UpdateDeveloperUseCase } from '../../../application'

export class UpdateDeveloperController extends BaseController {
  private developerRepository: IDeveloperRepository

  constructor(developerRepository: IDeveloperRepository) {
    super()
    this.developerRepository = developerRepository
  }

  protected async executeImpl(): Promise<void | any> {
    const { nome, sexo, hobby, datanascimento } = this.req.body
    const { id } = this.req.params

    const useCase = new UpdateDeveloperUseCase(this.developerRepository)

    const developersResult = await useCase.execute({ nome, sexo, hobby, datanascimento } as any, id)

    if (developersResult.fail === true) {
      return this.error(developersResult.error)
    }

    return this.ok(developersResult.value.toDTO())
  }
}
