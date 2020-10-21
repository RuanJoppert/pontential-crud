import { Developer, DeveloperProps } from '../entity'

export interface IDeveloperRepository {
  create(developer: DeveloperProps, id?: string): Promise<Developer>
  update(developer: Partial<DeveloperProps>, id: string): Promise<Developer>
  removeById(id: string): Promise<boolean>

  findById(id: string): Promise<Developer>
  find(filter?: Partial<DeveloperProps>, offset?: number, limit?: number): Promise<Developer[]>
}
