const { compare } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
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

  const token = sign({role: user.role}, secret, {
    subject: String(user.id),
    expiresIn,
  });

  response.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 60 * 60 * 1000,
  })

  delete user.password;

  return response.json({user})

 }

}

module.exports = SessionsCrontroller;