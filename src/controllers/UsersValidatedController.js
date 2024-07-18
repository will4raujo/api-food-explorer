const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');
const knex = require('../database/knex');
class UsersValidatedController {
  async index(request, response) {
    const { user } = request

    const database = await sqliteConnection();

    const checkUserExists = await knex('users').where({ id: user.id });
    
    if (checkUserExists.length === 0 ) {
      throw new AppError("Acesso não autorizado", 401);
    }

    return response.status(200).json()

  }
}

module.exports = UsersValidatedController;