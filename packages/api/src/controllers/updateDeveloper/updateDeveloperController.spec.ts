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

  it('should return an array with invalid inputs', async () => {
    const response = await supertest(app).put('/developers/valid-id').send({
      nome: 'I',
      sexo: 'X',
      hobby: 'dormir',
      datanascimento: '1995/01/000'
    })

    expect(response.status).toBe(400)
    expect(response.body.type).toBe('error')
    expect(response.body.errors.length).toBe(3)
  })

  it('should return a Developer with valid input', async () => {
    const response = await supertest(app).put('/developers/valid-id').send({
      nome: 'Isa',
      sexo: 'F',
      hobby: 'dormir',
      datanascimento: '1995/01/01'
    })

    expect(response.status).toBe(200)

    const check = await supertest(app).get('/developers?nome=Isa')

    expect(check.status).toBe(200)
    expect(check.body.data.length).toBe(1)
  })
})
