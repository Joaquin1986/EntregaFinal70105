const { Router } = require('express');
const { CartsViewsController } = require('../../controllers/views/carts.views.controller');
const { passportCallBack } = require('../../passport/passportCallBack');
const { verifyOwnCartViews } = require('../../middleware/verifyOwnCart');

const cartsViewsRouter = Router();

cartsViewsRouter.get('/carts/:cid', passportCallBack('current', 'views'), verifyOwnCartViews, CartsViewsController.getCartById);

module.exports = cartsViewsRouter;