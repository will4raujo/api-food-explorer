exports.up = knex => knex.schema.createTable('ingredients', table => {
    table.increments('id');
    table.integer('dish_id').references('id').inTable('dishes').notNullable();
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.string('name').notNullable();
    
    
});

exports.down = knex => knex.schema.dropTable('ingredients');
