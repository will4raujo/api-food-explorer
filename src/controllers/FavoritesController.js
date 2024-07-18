const knex = require("../database/knex");
const AppError = require('../utils/AppError');

class OrdersController {
  async create(request, response) {
    const { dishId } = request.body;
    const user_id = request.user.id;

    if (!user_id) {
      throw new AppError('User not found', 404);
    }

    const alreadyFavorite = await knex('favorites')
      .where({ user_id, dish_id: dishId })
      .first();

    if (alreadyFavorite) {
      throw new AppError('Favorite already exists', 400);
    }

    await knex('favorites').insert({
      user_id,
      dish_id: dishId,
      is_favorite: true,
    });

    return response.status(201).json();
    
  }

  async index(request, response) {
    const user_id = request.user.id;

    if (!user_id) {
      throw new AppError('User not found', 404);
    }

    const favoriteDishesByUser = await knex('favorites')
      .where({ user_id, is_favorite: true })
      .select('dish_id');

    if (!favoriteDishesByUser) {
      throw new AppError('Favorites not found', 404);
    }

    const favoriteDishes = await knex('dishes')
      .whereIn('id', favoriteDishesByUser.map(favorite => favorite.dish_id));

    return response.status(200).json(favoriteDishes);
  }

  async remove(request, response) {
    const { dishId } = request.params;
    const user_id = request.user.id;

    const favorited = await knex('favorites')
      .where({ user_id, dish_id: dishId })
      .delete();

    return response.status(204).json(favorited);
  }

  async isFavoriteByDishId(request, response) {
    const { dishId } = request.params;
    const user_id = request.user.id;

    const favorite = await knex('favorites')
      .where({ user_id, dish_id: dishId })
      .first();

    if (!favorite) {
      throw new AppError('Favorite not found', 404);
    }

    return response.status(200).json(favorite);
  }
}

module.exports = OrdersController;
