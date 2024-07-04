const { Router } = require('express');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const DishesController = require('../controllers/DishesController');
const dishesController = new DishesController();

const dishesRoutes = Router();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get('/', dishesController.index);
dishesRoutes.post('/', dishesController.create);
dishesRoutes.get('/search', dishesController.getByTitle);
dishesRoutes.get('/search/ingredients', dishesController.getByIngredients);
dishesRoutes.get('/:id', dishesController.getById);
dishesRoutes.put('/:id', dishesController.update);
dishesRoutes.delete('/:id', dishesController.delete);

module.exports = dishesRoutes;
