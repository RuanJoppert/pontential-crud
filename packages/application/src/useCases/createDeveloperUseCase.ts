import { IDeveloperRepository, DeveloperProps, Developer } from 'potential-crud-developers'
import { AppError } from 'potential-crud-errors'
import { Result } from 'potential-crud-result'

export class CreateDeveloperUseCase {
  private developerRepository: IDeveloperRepository

  constructor(developerRepository: IDeveloperRepository) {
    this.developerRepository = developerRepository
  }

  async execute(props: DeveloperProps) {
    try {
      const developerResult = Developer.create(props)

      if (developerResult.fail === true) {
        return Result.fail(developerResult.error)
      }

      return Result.ok(await this.developerRepository.create(developerResult.value))
    } catch (error) {
      return Result.fail(new AppError.UnexpectedError(error))
    }
  }
}
