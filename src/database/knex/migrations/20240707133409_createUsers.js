const { hash } = require("bcryptjs");

exports.up = async function (knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id');
    table.text('name').notNullable();
    table.text('email').notNullable();
    table.text('password').notNullable();
    table.enum("role", ["admin", "customer"], { useNative: true, enumName: "roles" })
      .notNullable().defaultTo("customer");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  const hashedPasswordAdmin = await hash("123456", 8);
  const hashedPasswordCustomer = await hash("123456", 8);

  await knex("users").insert([
    {
      name: "Usuário admin",
      email: "admin@teste.com",
      password: hashedPasswordAdmin,
      role: "admin",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      name: "Usuário Cliente",
      email: "user@teste.com",
      password: hashedPasswordCustomer,
      role: "customer",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};