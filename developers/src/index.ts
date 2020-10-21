import { app } from './api/app'
import { knex } from './api/db/queryBuilder'

app.listen(process.env.APP_PORT, () => console.log(`Rodando na porta ${process.env.APP_PORT} 😎`))

