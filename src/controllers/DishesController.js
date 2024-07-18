const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesController {
  async create(request, res) {
    const { name, category, description, price, ingredients } = request.body;
    const user_id = request.user.id;

    const [dish_id] = await knex("dishes").insert({
      name,
      category,
      description,
      price,
      user_id,
    });

    const parsedIngredients = JSON.parse(ingredients);
    const ingredientsToInsert = parsedIngredients.map(ingredient => ({
      dish_id,
      user_id,
      name: ingredient,
    }));

    await knex("ingredients").insert(ingredientsToInsert);

    if (request.file) {
      const dishFilename = request.file.filename;
      const diskStorage = new DiskStorage();
      const filename = await diskStorage.saveFile(dishFilename);
      await knex("dishes").where({ id: dish_id }).update({ image_url: filename });
    }

    return res.status(201).json();
  }

  async index(req, res) {
    const dishes = await knex("dishes").select("*");
    const user_id = req.user.id;

    const favorites = await knex("favorites")
      .where("user_id", user_id)
      .select("dish_id");

    const dishesWithFavorites = dishes.map(dish => {
      const isFavorite = favorites.some(favorite => favorite.dish_id === dish.id);
      return {
        ...dish,
        isFavorite,
      };
    })

    return res.json(dishesWithFavorites);
  }

  async byCategory(request, response) {
    const { c } = request.query;
    const user_id = request.user.id;
  
    try {
      const dishes = await knex('dishes').where('category', c);
  
      const favorites = await knex('favorites')
        .select('dish_id', 'is_favorite')
        .where('user_id', user_id);

      const dishesWithFavorites = dishes.map(dish => {
        const isFavorite = favorites.some(favorite => favorite.dish_id === dish.id && favorite.is_favorite === 1);
        return {
          ...dish,
          isFavorite: isFavorite,
        };
      });
  
      return response.json(dishesWithFavorites);
  
    } catch (error) {
      console.error('Error searching for dishes:', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async search(request, response) {
    const { q } = request.query;

    try {
      const results = await knex('dishes')
        .where('name', 'like', `%${q}%`)
        
        .orWhere(function() {
          this.whereIn('id', function() {
            this.select('dish_id')
              .from('ingredients')
              .where('name', 'like', `%${q}%`);
          });
        });

      return response.json(results);
    } catch (error) {
      console.error('Error searching for dishes:', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    const dish = await knex("dishes").where({ id }).first()
    const ingredients = await knex("ingredients").select("name", "id").where({ dish_id: id });
    if (!dish) {
      throw new AppError("Dish not found", 404);
    }

    const dishWithIngredients = {
      ...dish,
      ingredients,
    };

    return res.json(dishWithIngredients);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, category, description, price, ingredients } = req.body;
    const user_id = req.user.id;

    const diskStorage = new DiskStorage();
    const dish = await knex("dishes").where({ id }).first();
    const dishIngredients = await knex("ingredients").where({ dish_id: id});

    if (!dish) {
      throw new AppError("Dish not found", 404);
    }

    if (dish.user_id !== user_id) {
      throw new AppError("You can only update your own dishes", 403);
    }

    await knex("dishes").where({ id }).update({
      name,
      category,
      description,
      price,
    });

    if (ingredients) {
      const ingredientsToInsert = JSON.parse(ingredients).map(ingredient => ({
        dish_id: id,
        user_id,
        name: ingredient,
      }));

      await knex("ingredients").where({ dish_id: id }).delete();
      await knex("ingredients").insert(ingredientsToInsert);
    }

    if (req.file && dish.image_url) {
      await diskStorage.deleteFile(dish.image_url);
    }

    if (req.file) {
      const dishFilename = req.file.filename;
      const filename = await diskStorage.saveFile(dishFilename);
      await knex("dishes").where({ id }).update({ image_url: filename });
    }

    return res.json();
  }

  async delete(req, res) {
    const { id } = req.params;
    const user_id = req.user.id;
    const ingredientsDish = await knex("ingredients").where({ dish_id: id });

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Dish not found", 404);
    }

    if (dish.user_id !== user_id) {
      throw new AppError("You can only delete your own dishes", 403);
    }

    if (ingredientsDish.length > 0) {
      await knex("ingredients").where({ dish_id: id }).delete();
    }

    await knex("dishes").where({ id }).delete();

    return res.json();
  }
  
}

module.exports = DishesController;