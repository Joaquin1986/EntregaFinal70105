const { Router } = require('express');
const { ProductViewsControllers } = require('../../controllers/product.views.controllers');
const { passportViewsCallBack } = require('../../passport/passportViewsCallback');
const { verifyAdmin } = require('../../middleware/verifyAdmin');

const productsViewsRouter = Router();

productsViewsRouter.get('/products', ProductViewsControllers.getProducts);

productsViewsRouter.get('/products/:pid', passportViewsCallBack('current'), ProductViewsControllers.getProductById);

productsViewsRouter.get('/realTimeProducts', passportViewsCallBack('current'), verifyAdmin, ProductViewsControllers.getRealTimeProducts);

module.exports = productsViewsRouter;