import { IDeveloperRepository } from 'potential-crud-developers'
import { AppError } from 'potential-crud-errors'
import { Result } from 'potential-crud-result'

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
