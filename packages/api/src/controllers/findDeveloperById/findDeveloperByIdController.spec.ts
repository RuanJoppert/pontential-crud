import supertest from 'supertest'
import { app } from '../../app'
import { knex } from '../../db/queryBuilder'

describe('FindDevelopersById Controller', () => {
  beforeAll(async () => {
    await knex.migrate.latest()
    await knex.seed.run()
  })

  afterAll(() => {
    return knex.migrate.rollback().then(() => knex.destroy())
  })

  it('should return not found', async () => {
    const response = await supertest(app).get('/developers/123')

    expect(response.status).toBe(404)
    expect(response.body.type).toBe('error')
    expect(response.body.errors.length).toBe(1)
    expect(response.body.errors[0].name).toBe('Not Found')
  })

  it('should return not found', async () => {
    const response = await supertest(app).get('/developers/valid-id')

    expect(response.status).toBe(200)
    expect(response.body.nome).toBe('Ruan')
    expect(response.body.sexo).toBe('M')
    expect(response.body.hobby).toBe('cinema')
  })
})
