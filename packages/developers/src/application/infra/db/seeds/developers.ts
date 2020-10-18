import * as Knex from 'knex'
import faker from 'faker'
import { Developer } from '../../../../domain/entity/Developer'

const createFakeDeveloper = () => {
  const dev = Developer.create({
    nome: faker.name.findName(),
    sexo: faker.random.arrayElement(['M', 'F']),
    hobby: faker.random.word(),
    datanascimento: faker.date.past(18)
  })

  return dev.ok ? dev.value : false
}

export async function seed(knex: Knex): Promise<void> {
  await knex('developers').del()

  const fakeDevelopers = []
  const desiredFakeDevelopers = 30

  for (let i = 0; i < desiredFakeDevelopers; i++) {
    const developer = createFakeDeveloper()

    if (developer) {
      fakeDevelopers.push(createFakeDeveloper())
    }
  }

  await knex('developers').insert(fakeDevelopers)
}
