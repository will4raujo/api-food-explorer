const { Router } = require('express');
const FavoritesController = require('../controllers/FavoritesController');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');


const favoritesController = new FavoritesController();
const favoritesRoutes = Router();

favoritesRoutes.use(ensureAuthenticated);

favoritesRoutes.get('/', verifyUserAuthorization(['customer']), favoritesController.index);
favoritesRoutes.post('/', verifyUserAuthorization(['customer']), favoritesController.create);
favoritesRoutes.delete('/:dishId', verifyUserAuthorization(['customer']), favoritesController.remove);
favoritesRoutes.get('/isFavorite/:dishId', verifyUserAuthorization(['customer']), favoritesController.isFavoriteByDishId);

module.exports = favoritesRoutes;