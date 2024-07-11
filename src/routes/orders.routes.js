const { Router } = require('express');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const OrdersController = require('../controllers/OrdersController');

const ordersController = new OrdersController();
const ordersRoutes = Router();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.get('/', verifyUserAuthorization(['admin']), ordersController.index);
ordersRoutes.post('/', verifyUserAuthorization(['customer']), ordersController.create);

module.exports = ordersRoutes;