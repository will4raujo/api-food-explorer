
exports.up = knex => knex.schema.createTable('users', table => {
  table.increments('id')
  table.text('name').notNullable()
  table.text('email').notNullable()
  table.text('password').notNullable()

  table.enum("role", ["admin", "customer"], {useNative: true, enumName: "roles"})
  .notNullable().defaultTo("customer")
  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())
}).then(() => {
  return knex("users").insert([
    {
      name: "Semeador",
      email: "semeador@teste.com",
      password: "kd65dAnAd8yY4E5a3W",
      role: "admin",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
  ])
})



exports.down = knex => knex.schema.dropTable("users")
