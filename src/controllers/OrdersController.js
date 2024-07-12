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
    }))

    const formattedDetailing = detailing.map(dish => `${dish.quantity} x ${dish.dish_name}`).join(', ');

    const order = {
      user_id,
      detailing: formattedDetailing,
      total,
      status,
      payment_method,
    };

    await knex('orders').insert(order);

    return response.status(201).json(order);
  }

  async index(_, response) {
    const orders = await knex('orders').select('*');

    return response.json(orders);
  }

  async orderStatus(request, response) {
    const { id } = request.params;
    const { status } = request.body;

    const order = await knex('orders').where({ id }).first();

    if (!order) {
      throw new AppError('Order not found', 404);
    } 

    await knex('orders').where({ id }).update({ status });

    return response.json({ message: 'Order status updated' });
  }
}

module.exports = OrdersController;