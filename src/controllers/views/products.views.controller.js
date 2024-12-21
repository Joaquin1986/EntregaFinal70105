const { ProductServices } = require('../../services/product.services');
const { buildResponse } = require('../../utils/utils');
const passportGetUser = require('../../passport/passportGetUser');

const splideCss = 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css';

class ProductsViewsController {

    // Por defecto, siempre se muestran productos que estén activados (status=true)
    static async getProducts(req, res) {
        try {
            const builtResponse = await buildProductsViewsResponse(req, 'products');
            passportGetUser('current', req, res);
            let user = null;
            if (req.user)
                user = req.user;
            const { payload, ...details } = builtResponse;
            const title = "APP -> Listado de Productos 📦";
            res.render('index', { products: payload, title: title, details: details, user: user });
        } catch (error) {
            const title = "Error interno 🚧 (500)";
            res.render('internalError500', { title: title, message: error.message });
        }
    }

    static async getProductById(req, res) {
        try {
            const { pid } = req.params;
            const product = await ProductServices.getProductById(pid);
            let title = "APP -> ";
            if (product) {
                title += "Detalle de " + product.title;
            } else {
                title += "Producto no válido"
            }
            res.render('productDetail', { product: product, title: title, splideCss: splideCss });
        } catch (error) {
            const title = "Error interno 🚧 (500)";
            res.render('internalError500', { title: title, message: error.message });
        }
    }

    static async getRealTimeProducts(req, res) {
        try {
            passportGetUser('current', req, res);
            let user = null;
            if (req.user)
                user = req.user;
            const products = await buildProductsViewsResponse(req, 'realtimeproducts');
            const { payload, ...details } = products;
            const title = 'APP -> Listado en Tiempo Real de Productos⌚📦';
            res.render('realTimeProducts', { title: title, products: payload, details: details, user: user });
        } catch (error) {
            const title = "Error interno 🚧 (500)";
            res.render('internalError500', { title: title, message: error.message });
        }
    }

}

const buildProductsViewsResponse = async (req, site) => {
    try {
        let { limit, page, sort, category } = req.query;
        let criteria = { "status": true };
        let options = {};
        limit = parseInt(limit);
        page = parseInt(page);
        if (category)
            criteria = { "category": { '$regex': category, $options: 'i' }, "deleted": false, "status": true };
        else
            criteria = { "deleted": false, "status": true };
        if (sort && (sort.toLowerCase() !== 'asc' && sort.toLowerCase() !== 'desc')) sort = false;
        sort ? options = { "limit": limit, "page": page, lean: true, sort: { "price": sort } }
            : options = { "limit": limit, "page": page, lean: true };
        if (!limit || limit < 1) limit = 10;
        if (!page || page < 1) page = 1;
        const productsToDisplay = await ProductServices.getPaginatedProducts(criteria, options);
        return buildResponse(productsToDisplay, 'views', site, sort, category);
    } catch (error) {
        throw new Error("⛔ Error al paginar productos para vistas: " + error.message);

    }
}

module.exports = { ProductsViewsController }