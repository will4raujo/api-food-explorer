const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../configs/upload');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');
const DishesController = require('../controllers/DishesController');

const dishesController = new DishesController();

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get('/', verifyUserAuthorization(['admin', 'customer']), dishesController.index);
dishesRoutes.post('/', verifyUserAuthorization(['admin']), upload.single('image'), dishesController.create);
dishesRoutes.get('/category', verifyUserAuthorization(['admin', 'customer']), dishesController.byCategory);
dishesRoutes.get('/search', verifyUserAuthorization(['admin', 'customer']), dishesController.search);
dishesRoutes.get('/:id', verifyUserAuthorization(['admin', 'customer']), dishesController.getById);
dishesRoutes.put('/:id', verifyUserAuthorization(['admin']), upload.single('image'), dishesController.update);
dishesRoutes.delete('/:id', verifyUserAuthorization(['admin']), dishesController.delete);

module.exports = dishesRoutes;
