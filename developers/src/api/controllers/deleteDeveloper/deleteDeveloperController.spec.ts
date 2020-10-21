import supertest from 'supertest'
import { app } from '../../app'
import { knex } from '../../db/queryBuilder'

describe('CreateDevelopers Controller', () => {
  beforeAll(async () => {
    await knex.migrate.latest()
    await knex.seed.run()
  })

  afterAll(() => {
    return knex.migrate.rollback().then(() => knex.destroy())
  })

  it('should return a error with invald id', async () => {
    const response = await supertest(app).delete('/developers/invalid-id')

    expect(response.status).toBe(400)
    expect(response.body.type).toBe('error')
    expect(response.body.errors.length).toBe(1)
  })

  it('should delete a Developer with a valid id', async () => {
    const response = await supertest(app).delete('/developers/valid-id')

    expect(response.status).toBe(204)

    const check = await supertest(app).get('/developers/valid-id')

    expect(check.status).toBe(404)
  })
})
