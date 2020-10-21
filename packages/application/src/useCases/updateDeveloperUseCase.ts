import { IDeveloperRepository, DeveloperProps, Developer } from 'potential-crud-developers'
import { AppError } from 'potential-crud-errors'
import { Result } from 'potential-crud-result'

export class UpdateDeveloperUseCase {
  private developerRepository: IDeveloperRepository

  constructor(developerRepository: IDeveloperRepository) {
    this.developerRepository = developerRepository
  }

  async execute(props: Partial<DeveloperProps>, id: string) {
    try {
      if (!props) {
        return Result.fail(new AppError.InvalidInput('Must provided a valid data'))
      }

      const developer = await this.developerRepository.findById(id)

      if (developer === null) {
        return Result.fail(new AppError.NotFound('Developer not found'))
      }

      const developerResult = Developer.from(developer).update(props)

      if (developerResult.fail === true) {
        return Result.fail(developerResult.error)
      }

      return Result.ok(await this.developerRepository.update(props, id))
    } catch (error) {
      return Result.fail(new AppError.UnexpectedError(error))
    }
  }
}
