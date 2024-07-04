const { compare } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const authConfig = require("../config/auth");
const { sign } = require("jsonwebtoken");

class SessionsCrontroller {
 async create(request, response) {

  const { email, password } = request.body

  const user = await knex("users").where("email", email).first();

  if (!user) {
    throw new AppError("E-mail ou senha incorretos", 401);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("E-mail ou senha incorretos", 401);
  }

  const { secret, expiresIn } = authConfig.jwt;

  const token = sign({}, secret, {
    subject: String(user.id),
    expiresIn,
  });

  return response.json({user, token})

 }

}

module.exports = SessionsCrontroller;