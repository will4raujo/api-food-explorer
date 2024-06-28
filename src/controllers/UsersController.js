const sqliteConnection = require('../database/sqlite');
class UserController {
  async create(request, response) { 
    const { name, email, password } = request.body

    const database = await sqliteConnection();
    
    const checkUsersExists = await database.get('SELECT * from users WHERE EMAIL = (?)', [email])
  
    if (checkUsersExists ) {
      throw new Error('Este e-mail já existe') //substituir por app error
    }
  }
}

module.exports = UserController;