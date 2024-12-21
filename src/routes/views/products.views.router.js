const { Router } = require('express');
const { ProductsViewsController } = require('../../controllers/views/products.views.controller');
const { passportCallBack } = require('../../passport/passportCallBack');
const { verifyViewsAdmin } = require('../../middleware/verifyAdmin');

const productsViewsRouter = Router();

productsViewsRouter.get('/products', ProductsViewsController.getProducts);

productsViewsRouter.get('/products/:pid', passportCallBack('current', 'views'), ProductsViewsController.getProductById);

productsViewsRouter.get('/realTimeProducts', passportCallBack('current', 'views'), verifyViewsAdmin, ProductsViewsController.getRealTimeProducts);

module.exports = productsViewsRouter;