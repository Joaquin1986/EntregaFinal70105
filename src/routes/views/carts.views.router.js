const { Router } = require('express');
const { CartViewsControllers } = require('../../controllers/cart.views.controllers');
const { passportViewsCallBack } = require('../../passport/passportViewsCallBack');
const { verifyOwnCart } = require('../../middleware/verifyOwnCart');

const cartsViewsRouter = Router();

cartsViewsRouter.get('/carts/:cid', passportViewsCallBack('current'), verifyOwnCart, CartViewsControllers.getCartById);

module.exports = cartsViewsRouter;