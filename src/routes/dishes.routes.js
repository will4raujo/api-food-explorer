const { Router } = require('express');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const DishesController = require('../controllers/DishesController');
const dishesController = new DishesController();
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

const dishesRoutes = Router();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get('/', verifyUserAuthorization(['admin', 'customer']), dishesController.index);
dishesRoutes.post('/', verifyUserAuthorization(['admin']), dishesController.create);
dishesRoutes.get('/search', verifyUserAuthorization(['admin', 'customer']), dishesController.getByTitle);
dishesRoutes.get('/search/ingredients', verifyUserAuthorization(['admin', 'customer']), dishesController.getByIngredients);
dishesRoutes.get('/:id', verifyUserAuthorization(['admin', 'customer']), dishesController.getById);
dishesRoutes.put('/:id', verifyUserAuthorization(['admin']), dishesController.update);
dishesRoutes.delete('/:id', verifyUserAuthorization(['admin']), dishesController.delete);

module.exports = dishesRoutes;
