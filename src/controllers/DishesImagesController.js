const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class DishesImagesController {
  async upload (req, res) {
    const { id } = req.params;
    const dishFilename = req.file.filename;
    
    const dish = await knex('dishes').where({ id }).first();
    const diskStorage = new DiskStorage();
    
    if (!dish) {
      throw new AppError('Dish not found', 404);
    }

    if ( dish.image_url ) {
      await diskStorage.deleteFile(dish.image_url);
    }

    const filename = await diskStorage.saveFile(dishFilename);
    dish.image_url = filename;

    await knex('dishes').where({ id }).update({ image_url: filename });

    return res.json();
  }
}

module.exports = DishesImagesController;