const { ProductDto } = require('../dto/product.dto');
const { ProductDao } = require('../dao/product.dao');
const { mongoose } = require('mongoose');

class ProductRepository {

    static async getProduct(id) {
        if (mongoose.isValidObjectId(id)) {
            const dtoProduct = new ProductDto(await ProductDao.getProductById(id));
            return dtoProduct;
        }
        return null;
    }

    static formatProductsArray(products) {
        let dtoProducts = [];
        if (products.docs.length > 0)
            for (let i = 0; i < products.docs.length; i++) {
                dtoProducts.push(new ProductDto(products.docs[i]));
            }
        return {
            "docs": dtoProducts,
            "totalPages": products.totalPages,
            "prevPage": products.prevPage,
            "nextPage": products.nextPage,
            "page": products.page,
            "hasPrevPage": products.hasPrevPage,
            "hasNextPage": products.hasNextPage
        };
    }
}

module.exports = { ProductRepository };