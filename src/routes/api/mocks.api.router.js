const { Router } = require('express');
const { MocksController } = require('../../controllers/api/mocks.api.controller');
const { passportCallBack } = require('../../passport/passportCallBack');
const { verifyAdmin } = require('../../middleware/verifyAdmin');

const mocksApiRouter = Router();

// Se restringen los endpoints que generan datos en la BD (para usuarios administradores)

mocksApiRouter.get("/mockingpets", MocksController.generateFakePets);

mocksApiRouter.get("/mockingusers", MocksController.generateFakeUsers);

mocksApiRouter.get("/mockingproducts", MocksController.generateFakeProducts);

mocksApiRouter.post("/generateData", passportCallBack('current', 'api'), verifyAdmin, MocksController.generateData);

mocksApiRouter.post("/generateProducts", passportCallBack('current', 'api'), verifyAdmin, MocksController.generateDataProducts);

module.exports = mocksApiRouter;