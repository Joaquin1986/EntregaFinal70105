const { Router } = require('express');
const { ProductsController } = require('../../controllers/api/products.api.controller');
const { passportCallBack } = require('../../passport/passportCallBack');
const { verifyAdmin } = require('../../middleware/verifyAdmin');
const { uploadMulter } = require('../../utils/utils');

const productsApiRouter = Router();

// Este Endpoint acepta por query param 'sort','limit', 'category' y 'available'. Para 'available',
// si se especifica, admite solamente true o false.
productsApiRouter.get("/products", ProductsController.getProducts);

productsApiRouter.get("/products/:pid", ProductsController.getProductById);

// Al siguiente endpoint (POST) se le puede pasar un array llamado 'thumbnails" por Multer
productsApiRouter.post("/products", passportCallBack('current', 'api'), verifyAdmin, uploadMulter.array('thumbnails'), ProductsController.createProduct);

/* El siguiente endpoint (put) admite de forma opcional que se envíe el argumento 'deleteThumbIndex'
   en el body, el cual corresponde a la posición (a partir de 1) de cierta thumbnail que se desee borrar.
   Se pueden enviar también los valores  'deleteThumbIndex' como un array.
   Unicos status permitidos: true o false. Valor por defecto siempre es true, a menos que se especifique false.*/

productsApiRouter.put("/products/:pid", passportCallBack('current', 'api'), verifyAdmin, uploadMulter.array('thumbnails'), ProductsController.updateProduct);

productsApiRouter.delete("/products/:pid", passportCallBack('current', 'api'), verifyAdmin, ProductsController.deleteProduct);

module.exports = productsApiRouter;