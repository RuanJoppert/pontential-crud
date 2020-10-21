import { IDeveloperRepository } from '../../domain'
import { AppError } from '../../utils'
import { Result } from '../../utils'

export class DeleteDeveloperUseCase {
  private developerRepository: IDeveloperRepository

  constructor(developerRepository: IDeveloperRepository) {
    this.developerRepository = developerRepository
  }

  async execute(id: string) {
    try {
      const developer = await this.developerRepository.removeById(id)

      if (developer === false) {
        return Result.fail(new AppError.InvalidInput('Invalid ID'))
      }

      return Result.ok(id)
    } catch (error) {
      return Result.fail(new AppError.UnexpectedError(error))
    }
  }
}
