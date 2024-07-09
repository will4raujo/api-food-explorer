exports.up = knex => knex.schema.createTable('ingredients', table => {
    table.increments('id');
    table.integer('dish_id').references('id').inTable('dishes').onDelete('CASCADE')
    table.integer('user_id').references('id').inTable('users')
    table.string('name').notNullable();
}).then(() => {
    return knex('ingredients').insert([
        {
            dish_id: 1,
            user_id: 1,
            name: 'Rabanetes'
        },
        {
            dish_id: 1,
            user_id: 1,
            name: 'Folhas verdes'
        },
        {
            dish_id: 1,
            user_id: 1,
            name: 'Molho agridoce'
        },
        {
            dish_id: 1,
            user_id: 1,
            name: 'Gergelim'
        },
        {
            dish_id: 2,
            user_id: 1,
            name: 'Massa fresca'
        },
        {
            dish_id: 2,
            user_id: 1,
            name: 'Camarões'
        },
        {
            dish_id: 2,
            user_id: 1,
            name: 'Pesto'
        },
        {
            dish_id: 3,
            user_id: 1,
            name: 'Presunto de parma'
        },
        {
            dish_id: 3,
            user_id: 1,
            name: 'Rúcula'
        },
        {
            dish_id: 3,
            user_id: 1,
            name: 'Pão com fermentação natural'
        },
        {
            dish_id: 4,
            user_id: 1,
            name: 'Folhas verdes de alface'
        },
        {
            dish_id: 4,
            user_id: 1,
            name: 'Manjericão'
        },
        {
            dish_id: 4,
            user_id: 1,
            name: 'Tomate'
        },
        {
            dish_id: 4,
            user_id: 1,
            name: 'Cebola roxa'
        },
        {
            dish_id: 4,
            user_id: 1,
            name: 'Pepino'
        },
        {
            dish_id: 5,
            user_id: 1,
            name: 'Torta de ameixa'
        },
        {
            dish_id: 5,
            user_id: 1,
            name: 'Massa amanteigada'
        },
        {
            dish_id: 5,
            user_id: 1,
            name: 'Polvilho em açucar'
        },
        {
            dish_id: 6,
            user_id: 1,
            name: 'Pêssego'
        },
        {
            dish_id: 6,
            user_id: 1,
            name: 'Massa folhada'
        },
        {
            dish_id: 6,
            user_id: 1,
            name: 'Açucar'
        },
        {
            dish_id: 6,
            user_id: 1,
            name: 'Folhas de hortelã'
        },
    ])
})

exports.down = knex => knex.schema.dropTable('ingredients');
