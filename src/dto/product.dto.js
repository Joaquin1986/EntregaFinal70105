class ProductDto {
    constructor(product) {
        // Se muestra el '_id' enmascarado como 'code' para la verificación de las mascotas luego del mocking
        this.code = product._id;
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.stock = product.stock;
        this.category = product.category;
    }
}

module.exports = { ProductDto };