exports.up = knex => knex.schema.createTable('dishes', table => {
    table.increments('id')
    table.text('name').notNullable()
    table.text('category').notNullable()
    table.text('description').notNullable()
    table.decimal('price').notNullable()
    table.integer('user_id').references('id').inTable('users')

    table.text('image_url')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
}).then(() => {
    return knex('dishes').insert([
        {
            name: 'Salada Ravanello',
            category: 'refeições',
            description: 'Rabanetes, folhas verdes, molho agridoce salpicado com gergelim.',
            price: 49.97,
            user_id: 1,
            image_url: 'salada-ravanello.png',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        },
        {
            name: 'Spaguetti Gambe',
            category: 'refeições',
            description: 'Massa fresca com camarões e pesto.',
            price: 79.97,
            user_id: 1,
            image_url: 'spaguetti-gambe.png',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        },
        {
            name: 'Torradas de Parma',
            category: 'refeições',
            description: 'Presunto de parma e rúcula em um pão com fermentação natural.',
            price: 25.97,
            user_id: 1,
            image_url: 'torradas-de-parma.png',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        },
        {
            name: 'Salada da Casa Branca',
            category: 'refeições',
            description: 'Folhas verdes de alface e manjericão, tomate, cebola roxa e pepino.',
            price: 29.97,
            user_id: 1,
            image_url: 'salada-da-casa-branca.png',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        },
        {
            name: 'Prugna Pie',
            category: 'sobremesas',
            description: 'Torta de ameixa com massa amanteigada, polvilho em açucar',
            price: 79.97,
            user_id: 1,
            image_url: 'prugna-pie.png',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        },
        {
            name: 'Peachy pastrie',
            category: 'sobremesas',
            description: 'Delicioso folheado de pêssego com folhas de hortelã.',
            price: 59.97,
            user_id: 1,
            image_url: 'peachy-pastrie.png',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        },
        {
            name: 'Macarons',
            category: 'sobremesas',
            description: 'Farinha de amêndoas, manteiga, claras e açúcar.',
            price: 39.97,
            user_id: 1,
            image_url: 'macarons.png',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        },
        {
            name: 'Bolo de ameixa',
            category: 'sobremesas',
            description: 'Bolo de ameixa fresca cortada em fatias com creme de leite e gostas de baunilha.',
            price: 49.97,
            user_id: 1,
            image_url: 'bolo-de-ameixa.png',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        },
        {
            name: 'Espresso',
            category: 'bebidas',
            description: 'Café cremoso feito na temperatura e pressões perfeitas.',
            price: 15.97,
            user_id: 1,
            image_url: 'espresso.png',
            created_at: knex.fn.now(),
        },
        {
            name: 'Suco de maracujá',
            category: 'bebidas',
            description: 'Suco de maracujá gelado, cremoso, docinho.',
            price: 13.97,
            user_id: 1,
            image_url: 'suco-de-maracuja.png',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        },
        {
            name: "Tè d'autonno",
            category: 'bebidas',
            description: 'Chá de anis, canela e limão. Sinta o outono italiano.',
            price: 19.97,
            user_id: 1,
            image_url: 'te-dautonno.png',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        },
        {
            name: "Vanilla Sky",
            category: 'bebidas',
            description: 'vermute, vodka de baunilha e fatias de maçã.',
            price: 39.97,
            user_id: 1,
            image_url: 'vanilla-sky.png',
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        }

    ]);
});

exports.down = knex => knex.schema.dropTable('dishes');
