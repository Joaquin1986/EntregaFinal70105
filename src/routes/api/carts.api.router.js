const { Router } = require('express');
const { CartsController } = require('../../controllers/api/carts.api.controllers');
const { passportCallBack } = require('../../passport/passportCallBack');
const { verifyOwnCart } = require('../../middleware/verifyOwnCart');

const cartsApiRouter = Router();

cartsApiRouter.get("/carts/:cid", passportCallBack('current', 'api'), verifyOwnCart, CartsController.getCartById);

cartsApiRouter.post("/carts/:cid/purchase", passportCallBack('current', 'api'), verifyOwnCart, CartsController.purchaseCart);

cartsApiRouter.put("/carts/:cid/products/:pid", passportCallBack('current', 'api'), verifyOwnCart, CartsController.updateCartByProduct);

cartsApiRouter.put("/carts/:cid", passportCallBack('current', 'api'), verifyOwnCart, CartsController.updateCart);

cartsApiRouter.delete("/carts/:cid", passportCallBack('current', 'api'), verifyOwnCart, CartsController.deleteCart);

// Elimina un producto de un carrito
cartsApiRouter.delete("/carts/:cid/products/:pid", passportCallBack('current', 'api'), verifyOwnCart, CartsController.deleteProductFromCart);

module.exports = cartsApiRouter;