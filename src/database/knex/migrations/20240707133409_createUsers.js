
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
      name: "Usuário Admin",
      email: "admin@teste.com",
      password: "123456",
      role: "admin",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      name: "Customer",
      email: "customer@teste.com",
      password: "123456",
      role: "customer",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
  ])
})



exports.down = knex => knex.schema.dropTable("users")
