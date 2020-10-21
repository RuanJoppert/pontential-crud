import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('developers', (table) => {
    table.string('_id', 36).unique().notNullable()
    table.string('nome', 100).notNullable()
    table.specificType('sexo', 'char(1)').defaultTo('M')
    table.string('hobby')
    table.date('datanascimento')
    table.dateTime('created_at').defaultTo(knex.raw('NOW()'))
    table.dateTime('updated_at').defaultTo(knex.raw('NOW()'))
    table.increments('developer_id').primary().unique()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('developers')
}
