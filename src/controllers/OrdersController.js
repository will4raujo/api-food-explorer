const knex = require("../database/knex");
const AppError = require('../utils/AppError');

class OrdersController {
  async create(request, response) {
    const { dishes, payment_method, total } = request.body;

    const user_id = request.user.id;
    const status = 'pending';

    const detailing = dishes.map(dish => ({
      quantity: dish.quantity,
      dish_name: dish.name,
    }))

    const formattedDetailing = detailing.map(dish => `${dish.quantity} x ${dish.dish_name}`).join(', ');

    const [order_id] = await knex('orders').insert({
      user_id,
      detailing: formattedDetailing,
      total,
      status,
      payment_method,
    });

    return response.status(201).json({
      message: 'Order created successfully',
      id: order_id,
    });
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

  async searchStatusById(request, response) {
    const { id } = request.params;

    const order = await knex('orders').where({ id }).first();

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    return response.json(order.status);
  }
}

module.exports = OrdersController;