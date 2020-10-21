import supertest from 'supertest'
import { app } from '../../app'
import { knex } from '../../db/queryBuilder'

describe('FindDevelopers Controller', () => {
  beforeAll(async () => {
    await knex.migrate.latest()
    await knex.seed.run()
  })

  afterAll(() => {
    return knex.migrate.rollback().then(() => knex.destroy())
  })

  it('should return the paged records', async () => {
    const response = await supertest(app).get('/developers')

    expect(response.status).toBe(200)
    expect(response.body.data.length).toBe(10)
  })

  it('should navigate between the pages', async () => {
    const page1 = await supertest(app).get('/developers')
    const page2 = await supertest(app).get('/developers?page=2')

    expect(page1.status).toBe(200)
    expect(page1.body.data.length).toBe(10)
    expect(page1.body.data[0].id === page2.body.data[0].id).toBeFalsy()
  })

  it('should change the pageSize', async () => {
    const response = await supertest(app).get('/developers?pageSize=20')

    expect(response.status).toBe(200)
    expect(response.body.data.length).toBe(20)
  })

  it('should change combine pageSize and page', async () => {
    const response = await supertest(app).get('/developers?page=2&pageSize=20')

    expect(response.status).toBe(200)
    expect(response.body.data.length).toBe(10)
  })

  it('should filter the results', async () => {
    const response = await supertest(app).get('/developers?nome=Ruan')

    expect(response.status).toBe(200)
    expect(response.body.data.length).toBe(1)
  })

  it('should return empty in this search', async () => {
    const response = await supertest(app).get('/developers?sexo=X')

    expect(response.status).toBe(404)
    expect(response.body.data.length).toBe(0)
  })
})
