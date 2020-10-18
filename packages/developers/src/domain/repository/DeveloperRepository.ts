import { Developer, DeveloperProps } from '../entity/Developer'

export interface DeveloperRepository {
  create(developer: DeveloperProps, id?: string): Promise<Developer | Error[]>
  update(developer: DeveloperProps, id: string): Promise<true | null | Error[]>
  removeById(id: string): Promise<true | null>

  findById(id: string): Promise<Developer | null>
  find(filter: Partial<DeveloperProps>, offset: string, size: string): Promise<Developer[]>
}
