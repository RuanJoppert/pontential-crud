import { app } from './api/app'
import { knex } from './api/db/queryBuilder'

const start = async() => {
  if (process.env.NODE_ENV === 'development') {
    knex.schema.hasColumn('developers', 'nome').catch(async () => {
      await knex.migrate.latest()
      await knex.seed.run()
    })
  }

  app.listen(process.env.APP_PORT, () => console.log(`Rodando na porta ${process.env.APP_PORT} 😎`))
}

start()

