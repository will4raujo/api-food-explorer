exports.up = knex => knex.schema.createTable('favorites', table => {
  table.increments('id')
  table.integer('user_id').references('id').inTable('users')
  table.integer('dish_id').references('id').inTable('dishes')
  table.boolean('is_favorite').defaultTo(false)
})

exports.down = knex => knex.schema.dropTable('favorites')