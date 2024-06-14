class UserController {
  async create(request, response) {
    console.log('Controller');
    return response.json({ message: 'Controller' });
  }
}

module.exports = UserController;