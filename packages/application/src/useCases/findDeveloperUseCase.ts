import { IDeveloperRepository } from '@potential-crud/developers'
import { Result } from '@potential-crud/result'

export class FindDeveloperUseCase {
  /**
   * Filters that can be used in the search
   */
  private trustedFilters: string[]

  private developerRepository: IDeveloperRepository

  constructor(developerRepository: IDeveloperRepository, trustedFilters: string[] = []) {
    this.developerRepository = developerRepository
    this.trustedFilters = trustedFilters
  }

  async execute(filters = {}, offset = 0, limit = 10) {
    try {
      const developers = await this.developerRepository.find(this.sanitizeFilters(filters), offset, limit)

      return Result.ok(developers)
    } catch (error) {
      return Result.fail(error)
    }
  }

  // --------------------------------------------------------------------------

  private sanitizeFilters(filters: object) {
    return Object.keys(filters).reduce((sanitezedFilters, key: keyof typeof filters) => {
      if (this.trustedFilters.indexOf(key) >= 0) {
        sanitezedFilters[key] = filters[key]
      }
      return sanitezedFilters
    }, {})
  }
}
