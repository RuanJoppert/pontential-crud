import { Developer } from '../../domain/entity/Developer'
import { knex } from '../infra/db/queryBuilder'
import { DeveloperRepository } from '../repository/DeveloperRepository'

const repository = new DeveloperRepository(knex)
let devParams

describe('Developer Repository implementation with knex query builder', () => {
  beforeAll(async () => {
    await knex.migrate.latest()
    await knex.seed.run()
  })

  afterAll(() => {
    return knex.migrate.rollback().then(() => knex.destroy())
  })

  beforeEach(() => {
    devParams = {
      nome: 'Jhon',
      sexo: 'M',
      hobby: 'Meu Hobby',
      datanascimento: '1992/04/10'
    }
  })

  describe('create', () => {
    it('should return null when creating with invalid input', async () => {
      devParams.nome = 'Jh'

      const developer = await repository.create(devParams)

      expect(developer).toBeNull()
    })

    it('should return a Developer when creating with valid input', async () => {
      const developer = await repository.create(devParams, '201')

      expect(developer).toBeInstanceOf(Developer)
      devParams.datanascimento = new Date(devParams.datanascimento)
      expect(developer).toMatchObject(devParams)
    })
  })

  describe('update', () => {
    it('should be return null when creating with invalid input', async () => {
      devParams.nome = 'Jh'

      const developer = await repository.update(devParams, '201')

      expect(developer).toBeNull()
    })

    it('should be return null when not found id', async () => {
      const developer = await repository.update(devParams, '404')

      expect(developer).toBeNull()
    })

    it('should be return a Developer when update with valid input', async () => {
      const developer = await repository.update(devParams, '201')

      expect(developer).toBeInstanceOf(Developer)
      devParams.datanascimento = new Date(devParams.datanascimento)
      expect(developer).toMatchObject(devParams)
    })
  })

  describe('findById', () => {
    it('should return null when not found a Developer Id', async () => {
      const developer = await repository.findById('404')

      expect(developer).toBeNull()
    })

    it('should find a developer by id', async () => {
      const developer = await repository.findById('201')

      expect(developer).toBeInstanceOf(Developer)
      devParams.datanascimento = new Date(devParams.datanascimento)
      expect(developer).toMatchObject(devParams)
    })
  })

  describe('find', () => {
    it('should return a list of developers', async () => {
      const developers = await repository.find()

      expect(developers).toBeInstanceOf(Array)
      expect(developers.length).toBe(10)
      expect(developers[0]).toBeInstanceOf(Developer)

      const last5 = await repository.find({}, 26) // 30 (seeds) + 1(test[id=201]) - 5

      expect(last5.length).toBe(5)
    })

    it('should return a empty list for a search nonsense', async () => {
      const developers = await repository.find({ hobby: 'Hobby not found' })

      expect(developers).toBeInstanceOf(Array)
      expect(developers.length).toBe(0)
    })

    it('should return list for a search', async () => {
      const developers = await repository.find({ hobby: 'Meu Hobby' })

      expect(developers).toBeInstanceOf(Array)
      expect(developers.length).toBe(1)
    })
  })

  describe('removeById', () => {
    it('should return false if a developer is not found', async () => {
      const developer = await repository.removeById('404')

      expect(developer).toBeFalsy()
    })

    it('should remove a Developer by id', async () => {
      const mustFound = await repository.findById('201')
      const removed = await repository.removeById('201')
      const mustNotFound = await repository.findById('201')

      expect(mustFound).toBeInstanceOf(Developer)
      expect(removed).toBeTruthy()
      expect(mustNotFound).toBeNull()
    })
  })
})
