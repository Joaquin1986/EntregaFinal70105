const { CartServices } = require('../../services/cart.services');

class CartsViewsController {

    static async getCartById(req, res) {
        const { cid } = req.params;
        const cart = await CartServices.getCartById(cid);
        let productsTotalCount = 0;
        let totalPrice = 0;
        let title = "APP -> ";
        let renderCart = new Boolean();
        if (cart) {
            title += "Carrito #" + cart._id;
            Object.values(cart.products).forEach(product => {
                productsTotalCount += parseInt(product.quantity);
                totalPrice += parseInt(product.product.price * product.quantity);
            })
            renderCart = true;
        } else {
            title += "Carrito no válido"
            renderCart = false;
        }
        const totalPriceWithTaxes = Math.round(totalPrice * 1.23);
        res.render('cart', {
            cart: cart, title: title, productsTotal: productsTotalCount,
            totalPrice: totalPrice, totalPriceWithTaxes: totalPriceWithTaxes, renderCart: renderCart
        });

    }
}

module.exports = { CartsViewsController }