const { Router } = require('express');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const OrdersController = require('../controllers/OrdersController');

const ordersController = new OrdersController();
const ordersRoutes = Router();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.get('/', verifyUserAuthorization(['admin', 'customer']), ordersController.index);
ordersRoutes.post('/', verifyUserAuthorization(['customer']), ordersController.create);
ordersRoutes.put('/:id', verifyUserAuthorization(['admin']), ordersController.orderStatus);
ordersRoutes.get('/:id', verifyUserAuthorization(['customer']), ordersController.searchStatusById);

module.exports = ordersRoutes;