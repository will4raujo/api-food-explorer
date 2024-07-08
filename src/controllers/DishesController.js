const knex = require("../database/knex");
const AppError = require("../utils/AppError");

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

    const ingredientsToInsert = ingredients.map(ingredient => {
      return {
        dish_id,
        user_id,
        name: ingredient,
      }
    });

    await knex("ingredients").insert(ingredientsToInsert);

    return res.status(201).json();
  }

  async index(req, res) {
    const dishes = await knex("dishes").select("*");
    return res.json(dishes);
  }

  async getByTitle(req, res) {
    const { title } = req.query;
    const dishes = await knex("dishes").where("name", "like", `%${title}%`);
    return res.json(dishes);
  }

  async getByIngredients(req, res) {
    const { ingredients } = req.query;
    const dishes = await knex("dishes")
      .join("ingredients", "dishes.id", "=", "ingredients.dish_id")
      .whereIn("ingredients.name", ingredients.split(","))
      .groupBy("dishes.id")
      .havingRaw(`COUNT(DISTINCT ingredients.name) = ${ingredients.split(",").length}`);
    return res.json(dishes);
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
      const ingredientsToInsert = ingredients.map(ingredient => {
        return {
          dish_id: id,
          user_id,
          name: ingredient,
        }
      });

      await knex("ingredients").where({ dish_id: id }).delete();
      await knex("ingredients").insert(ingredientsToInsert);
    }

    return res.json();
  }

  async delete(req, res) {
    const { id } = req.params;
    const user_id = req.user.id;

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Dish not found", 404);
    }

    if (dish.user_id !== user_id) {
      throw new AppError("You can only delete your own dishes", 403);
    }

    await knex("dishes").where({ id }).delete();

    return res.json();
  }
  
}

module.exports = DishesController;