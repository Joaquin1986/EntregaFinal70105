const { ProductServices } = require('../services/product.services');
const { buildResponse } = require('../utils/utils');

const splideCss = 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css';

class ProductViewsControllers {

    // Por defecto, siempre se muestran productos que estén activados (status=true)
    static async getProducts(req, res) {
        const builtResponse = await buildProductsViewsResponse(req, 'products');
        const { payload, ...details } = builtResponse;
        const title = "APP -> Listado de Productos 📦";
        res.render('index', { products: payload, title: title, details: details });
    }

    static async getProductById(req, res) {
        const { pid } = req.params;
        const product = await ProductServices.getProductById(pid);
        let title = "APP -> ";
        if (product) {
            title += "Detalle de " + product.title;
        } else {
            title += "Producto no válido"
        }
        res.render('productDetail', { product: product, title: title, splideCss: splideCss });
    }

    static async getRealTimeProducts(req, res) {
        const products = await buildProductsViewsResponse(req, 'realtimeproducts');
        const { payload, ...details } = products;
        const title = 'APP -> Listado en Tiempo Real de Productos⌚📦';
        res.render('realTimeProducts', { title: title, products: payload, details: details });
    }

}

const buildProductsViewsResponse = async (req, site) => {
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
}

module.exports = { ProductViewsControllers }