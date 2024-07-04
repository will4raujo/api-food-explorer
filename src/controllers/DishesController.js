const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesController {
  async create(req, res) {
    const { name, category, description, price, ingredients } = req.body;
    const user_id = req.user.id;

    const [dish_id] = await knex("dishes").insert({
      name,
      category,
      description,
      price,
      user_id,
    });

    const ingredientsToInsert = ingredients.map((ingredient) => ({
      dish_id,
      user_id,
      name: ingredient.name,
    }));

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
    const dish = await knex("dishes").where({ id }).first();
    if (!dish) {
      throw new AppError("Dish not found", 404);
    }
    return res.json(dish);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, category, description, price } = req.body;
    const user_id = req.user.id;

    const dish = await knex("dishes").where({ id }).first();

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