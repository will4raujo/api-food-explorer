const knex = require("../database/knex");
const AppError = require('../utils/AppError');

class OrdersController {
  async create(request, response) {
    const { dishes, payment_method } = request.body;

    const user_id = request.user.id;
    const status = 'pending';

    const total = dishes.reduce((acc, dish) => {
      return acc + dish.price * dish.quantity;
    }, 0);

    const detailing = dishes.map(dish => ({
      quantity: dish.quantity,
      dish_name: dish.name,
    }));

    const order = {
      user_id,
      detailing: JSON.stringify(detailing),
      total,
      status,
      payment_method,
    };

    await knex('orders').insert(order);

    return response.status(201).json(order);
  }

  async index(request, response) {
    const orders = await knex('orders').select('*');
    return response.json(orders);
  }

  async byUser(request, response) {
    const user_id = request.user.id;

    const orders = await knex('orders').where({ user_id });

    return response.json(orders);
  }
}

module.exports = OrdersController;