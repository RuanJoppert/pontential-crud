import { join } from 'path'

export default {
  client: 'mysql',
  debug: process.env.NODE_ENV === 'development',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  migrations: {
    tableName: 'migrations',
    directory: join(__dirname, './migrations/')
  },
  seeds: {
    directory: join(__dirname, './seeds/')
  }
}
