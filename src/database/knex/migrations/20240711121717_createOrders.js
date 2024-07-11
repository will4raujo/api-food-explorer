exports.up = knex => knex.schema.createTable('orders', table => {
    table.increments('id')
    table.integer('user_id').references('id').inTable('users')
    table.json('detailing').notNullable()
    table.decimal('total').notNullable()
    table.enum('status', ['pending', 'confirmed', 'delivered']).notNullable().defaultTo('pending')
    table.enum('payment_method', ['credit_card', 'pix']).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('orders')