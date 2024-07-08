const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../configs/upload');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');
const DishesController = require('../controllers/DishesController');
const DishesImagesController = require('../controllers/DishesImagesController');

const dishesController = new DishesController();
const dishesImagesController = new DishesImagesController();

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get('/', verifyUserAuthorization(['admin', 'customer']), dishesController.index);
dishesRoutes.post('/', verifyUserAuthorization(['admin']), dishesController.create);
dishesRoutes.get('/search', verifyUserAuthorization(['admin', 'customer']), dishesController.getByTitle);
dishesRoutes.get('/search/ingredients', verifyUserAuthorization(['admin', 'customer']), dishesController.getByIngredients);
dishesRoutes.get('/:id', verifyUserAuthorization(['admin', 'customer']), dishesController.getById);
dishesRoutes.put('/:id', verifyUserAuthorization(['admin']), dishesController.update);
dishesRoutes.delete('/:id', verifyUserAuthorization(['admin']), dishesController.delete);
dishesRoutes.patch('/image/:id', verifyUserAuthorization(['admin']), upload.single('image'), dishesImagesController.upload);

module.exports = dishesRoutes;
