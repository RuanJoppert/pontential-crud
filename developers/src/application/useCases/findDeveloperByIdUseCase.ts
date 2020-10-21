import { IDeveloperRepository } from '../../domain'
import { AppError } from '../../utils'
import { Result } from '../../utils'

export class FindDeveloperByIdUseCase {
  private developerRepository: IDeveloperRepository

  constructor(developerRepository: IDeveloperRepository) {
    this.developerRepository = developerRepository
  }

  async execute(id: string) {
    try {
      const developer = await this.developerRepository.findById(id)

      if (developer === null) {
        return Result.fail(new AppError.NotFound('Developer not found'))
      }

      return Result.ok(developer)
    } catch (error) {
      return Result.fail(error)
    }
  }
}
