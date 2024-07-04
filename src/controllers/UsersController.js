const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');
const { hash } = require('bcryptjs');
class UserController {
  async create(request, response) {
    const { name, email, password } = request.body

    const database = await sqliteConnection();

    const checkUserExists = await database.get("Select * from users WHERE EMAIL = (?)", [email])

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    console.log('não existe')

    const passwordHash = await hash(password, 8);

    console.log('hash gerado')

    await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, passwordHash])

    console.log('inseriu no banco')

    return response.status(200).json()

  }
}

module.exports = UserController;