const sqliteConnection = require('../database/sqlite');
const { hash } = require('bcryptjs');
class UserController {
  async create(request, response) { 
    const { name, email, password } = request.body

    const database = await sqliteConnection();
    
    const checkUsersExists = await database.get('SELECT * from users WHERE EMAIL = (?)', [email])
  
    if (checkUsersExists ) {
      throw new Error('Este e-mail já existe') //substituir por app error
    }

    const passwordHash = await hash(password, 8);

    await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, passwordHash])

    return response.status(200).json({})

  }
}

module.exports = UserController;